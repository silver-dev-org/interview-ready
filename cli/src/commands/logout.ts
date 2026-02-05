import { logout } from '../lib/auth.js';
import { isAuthenticated } from '../lib/config.js';
import chalk from 'chalk';

/**
 * Handles the logout command
 */
export async function logoutCommand(): Promise<void> {
  try {
    if (!isAuthenticated()) {
      console.log(chalk.yellow('\n⚠️  Not currently authenticated\n'));
      return;
    }

    logout();
  } catch (error) {
    console.error(chalk.red('\n❌ Logout failed'));
    console.error(chalk.red(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
    process.exit(1);
  }
}
