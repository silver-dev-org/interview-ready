import { simpleGit } from 'simple-git';
import chalk from 'chalk';
import ora from 'ora';
import { Category } from '../types/index.js';
import path from 'path';

const git = simpleGit();

/**
 * Verifies that test files haven't been modified locally
 * Compares local test files with origin/main
 * Throws error if any test file has been modified
 */
export async function verifyTestIntegrity(category: Category): Promise<void> {
  const spinner = ora('Verifying test integrity...').start();

  try {
    // Get the repository root
    const repoRoot = await git.revparse(['--show-toplevel']);
    const testDir = path.join('technical-fundamentals', '__tests__', category);

    // Fetch latest from origin (quietly)
    await git.fetch('origin', 'main', { '--quiet': null });

    // Get diff for test files in the category
    const diff = await git.diff([
      'origin/main',
      '--',
      `${testDir}/`,
    ]);

    if (diff.trim().length > 0) {
      spinner.fail('Test files have been modified');

      // Get list of modified files
      const status = await git.diff([
        'origin/main',
        '--name-only',
        '--',
        `${testDir}/`,
      ]);

      const modifiedFiles = status
        .trim()
        .split('\n')
        .filter(f => f.length > 0);

      console.log(chalk.red('\n❌ Error: Test files have been modified'));
      console.log(chalk.yellow('   Your test files don\'t match the official repository'));
      console.log(chalk.yellow('   Please revert changes to test files and try again\n'));
      console.log(chalk.yellow('   Modified files:'));
      modifiedFiles.forEach((file: string) => {
        console.log(chalk.yellow(`   - ${file}`));
      });
      console.log();

      throw new Error('Test file integrity check failed');
    }

    spinner.succeed('Tests match remote repository (no modifications detected)');
  } catch (error) {
    if (error instanceof Error && error.message === 'Test file integrity check failed') {
      throw error;
    }

    spinner.fail('Failed to verify test integrity');

    // Handle common git errors
    if (error instanceof Error) {
      if (error.message.includes('not a git repository')) {
        throw new Error('This directory is not a git repository. Please clone the repository properly.');
      } else if (error.message.includes('unknown revision')) {
        throw new Error('Could not find origin/main branch. Please ensure you have the remote configured.');
      }
    }

    throw new Error(`Test integrity verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Gets the current git commit hash
 * Returns undefined if not in a git repository or on error
 */
export async function getCurrentCommit(): Promise<string | undefined> {
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash;
  } catch {
    return undefined;
  }
}
