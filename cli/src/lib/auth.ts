import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import { DeviceCodeResponse, TokenResponse, AuthConfig } from '../types/index.js';
import { setAuth, getAuth, clearAuth } from './config.js';

const DEVICE_AUTH_ENDPOINT = process.env.DEVICE_AUTH_ENDPOINT || 'https://api.clerk.com/v1/oauth/device';
const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT || 'https://api.clerk.com/v1/oauth/token';
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
const TOKEN_EXPIRY_SECONDS = parseInt(process.env.TOKEN_EXPIRY_SECONDS || '2592000', 10); // 30 days

/**
 * Initiates the device authorization flow
 * Displays verification URL and code to user
 * Polls until user authorizes or timeout
 */
export async function initiateDeviceFlow(): Promise<void> {
  console.log(chalk.bold('\n🔐 Interview Ready Authentication\n'));

  // Step 1: Request device code from Clerk
  const spinner = ora('Requesting device authorization...').start();

  let deviceCode: DeviceCodeResponse;
  try {
    const response = await axios.post<DeviceCodeResponse>(
      DEVICE_AUTH_ENDPOINT,
      {
        client_id: CLERK_PUBLISHABLE_KEY,
        scope: 'profile email',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    deviceCode = response.data;
    spinner.succeed('Device code received');
  } catch (error) {
    spinner.fail('Failed to request device code');
    throw new Error(`Device authorization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Step 2: Display verification URL and code to user
  console.log(chalk.cyan(`\nPlease visit: ${chalk.bold(deviceCode.verification_uri)}`));
  console.log(chalk.cyan(`Enter code: ${chalk.bold.yellow(deviceCode.user_code)}\n`));

  // Step 3: Poll for token
  const pollInterval = (deviceCode.interval || 5) * 1000; // Convert to milliseconds
  const expiresAt = Date.now() + deviceCode.expires_in * 1000;

  const pollSpinner = ora('Waiting for authorization...').start();

  while (Date.now() < expiresAt) {
    try {
      const tokenResponse = await axios.post<TokenResponse>(
        TOKEN_ENDPOINT,
        {
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
          device_code: deviceCode.device_code,
          client_id: CLERK_PUBLISHABLE_KEY,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Success! Store tokens
      pollSpinner.succeed('Successfully authenticated!');

      const auth: AuthConfig = {
        access_token: tokenResponse.data.access_token,
        refresh_token: tokenResponse.data.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
        user_id: tokenResponse.data.user_id,
        email: tokenResponse.data.email,
      };

      setAuth(auth);

      console.log(chalk.green(`  Email: ${auth.email}`));
      console.log(chalk.green(`  User ID: ${auth.user_id}`));
      console.log(chalk.green(`  Token valid for: 30 days\n`));

      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.error;

        // Handle different error codes
        if (errorCode === 'authorization_pending') {
          // User hasn't authorized yet, continue polling
          const timeRemaining = Math.floor((expiresAt - Date.now()) / 1000);
          const minutes = Math.floor(timeRemaining / 60);
          const seconds = timeRemaining % 60;
          pollSpinner.text = `Waiting for authorization... (expires in ${minutes}:${seconds.toString().padStart(2, '0')})`;
        } else if (errorCode === 'slow_down') {
          // Increase poll interval
          await new Promise(resolve => setTimeout(resolve, pollInterval * 2));
          continue;
        } else if (errorCode === 'expired_token') {
          pollSpinner.fail('Authorization expired');
          throw new Error('Device code expired. Please try again.');
        } else if (errorCode === 'access_denied') {
          pollSpinner.fail('Authorization denied');
          throw new Error('Authorization was denied by user.');
        } else {
          // Unknown error
          pollSpinner.fail('Authorization failed');
          throw new Error(`Authorization failed: ${errorCode || 'Unknown error'}`);
        }
      }
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  pollSpinner.fail('Authorization timeout');
  throw new Error('Authorization timed out. Please try again.');
}

/**
 * Returns a valid access token, refreshing if necessary
 */
export async function getValidAccessToken(): Promise<string> {
  const auth = getAuth();

  if (!auth) {
    throw new Error('Not authenticated. Run "npm run cli:login" first.');
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = auth.expires_at - now;

  // If token expires in less than 1 day, refresh it
  if (expiresIn < 86400) {
    try {
      await refreshToken();
      const newAuth = getAuth();
      if (!newAuth) {
        throw new Error('Failed to refresh token');
      }
      return newAuth.access_token;
    } catch (error) {
      // Refresh failed, clear auth and ask user to login again
      clearAuth();
      throw new Error('Token expired. Please run "npm run cli:login" again.');
    }
  }

  return auth.access_token;
}

/**
 * Refreshes the access token using the refresh token
 */
async function refreshToken(): Promise<void> {
  const auth = getAuth();

  if (!auth || !auth.refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post<TokenResponse>(
    TOKEN_ENDPOINT,
    {
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token,
      client_id: CLERK_PUBLISHABLE_KEY,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const newAuth: AuthConfig = {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
    user_id: response.data.user_id,
    email: response.data.email,
  };

  setAuth(newAuth);
}

/**
 * Logs out by clearing stored tokens
 */
export function logout(): void {
  clearAuth();
  console.log(chalk.green('\n✓ Successfully logged out\n'));
}
