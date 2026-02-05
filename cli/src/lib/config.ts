import Conf from 'conf';
import { Config, AuthConfig } from '../types/index.js';

const config = new Conf<Config>({
  projectName: 'interview-ready-cli',
  defaults: {
    portal_url: process.env.PORTAL_API_URL || 'https://app.silver.dev',
  },
  fileExtension: 'json',
});

export function getConfig(): Config {
  return config.store;
}

export function setAuth(auth: AuthConfig): void {
  config.set('auth', auth);
}

export function getAuth(): AuthConfig | undefined {
  return config.get('auth');
}

export function clearAuth(): void {
  config.delete('auth');
}

export function getPortalUrl(): string {
  return config.get('portal_url');
}

export function setLastSubmission(category: string, timestamp: string): void {
  config.set('last_submission', { category, timestamp });
}

export function getLastSubmission(): { category: string; timestamp: string } | undefined {
  return config.get('last_submission');
}

export function isAuthenticated(): boolean {
  const auth = getAuth();
  if (!auth) return false;

  // Check if token is expired
  const now = Math.floor(Date.now() / 1000);
  return auth.expires_at > now;
}
