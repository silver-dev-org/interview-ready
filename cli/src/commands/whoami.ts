import { isAuthenticated, getAuth } from '../lib/config.js';
import chalk from 'chalk';

/**
 * Handles the whoami command
 */
export async function whoamiCommand(): Promise<void> {
  try {
    if (!isAuthenticated()) {
      console.log(chalk.yellow('\n⚠️  Not authenticated'));
      console.log(chalk.gray('  Run "npm run cli:login" to authenticate\n'));
      return;
    }

    const auth = getAuth();

    if (!auth) {
      console.log(chalk.red('\n❌ No authentication data found\n'));
      return;
    }

    console.log(chalk.bold('\n👤 Current User\n'));
    console.log(chalk.cyan(`  Email: ${chalk.bold(auth.email)}`));
    console.log(chalk.cyan(`  User ID: ${chalk.bold(auth.user_id)}`));

    // Calculate token expiry
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = auth.expires_at - now;
    const daysRemaining = Math.floor(expiresIn / 86400);

    console.log(chalk.cyan(`  Token expires in: ${chalk.bold(`${daysRemaining} days`)}\n`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error'));
    console.error(chalk.red(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
    process.exit(1);
  }
}
