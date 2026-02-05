import { initiateDeviceFlow } from '../lib/auth.js';
import { isAuthenticated, getAuth } from '../lib/config.js';
import chalk from 'chalk';

/**
 * Handles the login command
 */
export async function loginCommand(): Promise<void> {
  try {
    // Check if already authenticated
    if (isAuthenticated()) {
      const auth = getAuth();
      console.log(chalk.yellow('\n⚠️  Already authenticated'));
      console.log(chalk.gray(`  Email: ${auth?.email}`));
      console.log(chalk.gray(`  User ID: ${auth?.user_id}\n`));
      console.log(chalk.gray('  Run "npm run cli:logout" to logout first.\n'));
      return;
    }

    // Start device authorization flow
    await initiateDeviceFlow();
  } catch (error) {
    console.error(chalk.red('\n❌ Login failed'));
    console.error(chalk.red(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
    process.exit(1);
  }
}
