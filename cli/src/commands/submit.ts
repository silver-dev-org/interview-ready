import chalk from 'chalk';
import ora from 'ora';
import { isAuthenticated, getAuth, getPortalUrl, setLastSubmission } from '../lib/config.js';
import { verifyTestIntegrity, getCurrentCommit } from '../lib/test-validator.js';
import { runCategoryTests } from '../lib/test-runner.js';
import { collectSolutions } from '../lib/file-collector.js';
import { PortalAPIClient } from '../lib/api.js';
import { Category, SubmissionPayload } from '../types/index.js';
import packageJson from '../../package.json' with { type: 'json' };

const VALID_CATEGORIES: Category[] = ['strings', 'lists', 'stacks', 'trees', 'recursion'];

/**
 * Handles the submit command
 */
export async function submitCommand(category: string): Promise<void> {
  try {
    // Validate category
    if (!VALID_CATEGORIES.includes(category as Category)) {
      console.log(chalk.red('\n❌ Error: Invalid category'));
      console.log(chalk.yellow(`   Valid categories: ${VALID_CATEGORIES.join(', ')}\n`));
      console.log(chalk.gray('   Usage: npm run cli:submit <category>'));
      console.log(chalk.gray('   Example: npm run cli:submit strings\n'));
      process.exit(1);
    }

    const typedCategory = category as Category;

    // Step 1: Check authentication
    console.log(chalk.bold('\n🔐 Authenticating...\n'));

    if (!isAuthenticated()) {
      console.log(chalk.red('❌ Error: Not authenticated'));
      console.log(chalk.yellow('   Run "npm run cli:login" to authenticate\n'));
      process.exit(1);
    }

    const auth = getAuth();
    if (!auth) {
      console.log(chalk.red('❌ Error: No authentication data found\n'));
      process.exit(1);
    }

    console.log(chalk.green(`✓ Logged in as ${auth.email}\n`));

    // Step 2: Verify test integrity
    console.log(chalk.bold('🔍 Verifying test integrity...\n'));
    await verifyTestIntegrity(typedCategory);
    console.log();

    // Step 3: Run tests
    console.log(chalk.bold(`🧪 Running tests for ${category} category...\n`));
    const testResult = await runCategoryTests(typedCategory);

    // Step 4: Collect solution files
    console.log(chalk.bold('📦 Collecting solution files...\n'));
    const solutions = await collectSolutions(typedCategory);

    if (solutions.length === 0) {
      console.log(chalk.red('❌ Error: No solution files found'));
      console.log(chalk.yellow('   Make sure you have solution files in the problems/ directory\n'));
      process.exit(1);
    }

    // Step 5: Get git commit (optional)
    const gitCommit = await getCurrentCommit();

    // Step 6: Build submission payload
    const payload: SubmissionPayload = {
      user_id: auth.user_id,
      email: auth.email,
      category: typedCategory,
      success_token: testResult.success_token,
      passed_tests: testResult.passed_tests,
      test_timestamp: new Date().toISOString(),
      solutions,
      cli_version: packageJson.version,
      git_commit: gitCommit,
    };

    // Step 7: Submit to portal
    console.log(chalk.bold('📤 Submitting to Interview Ready Portal...\n'));

    const spinner = ora('Uploading submission...').start();

    const portalUrl = getPortalUrl();
    const apiClient = new PortalAPIClient(portalUrl);

    try {
      const response = await apiClient.submitSolution(payload);

      spinner.succeed('Submission successful!');

      // Display success message
      console.log(chalk.green.bold('\n✓ Submission Successful!\n'));
      console.log(chalk.cyan(`   Submission ID: ${chalk.bold(response.submission_id)}`));
      console.log(chalk.cyan(`   Category: ${chalk.bold(category)}`));
      console.log(chalk.cyan(`   Tests passed: ${chalk.bold(`${testResult.test_count}/${testResult.test_count}`)}`));
      console.log(chalk.cyan(`   Submitted at: ${chalk.bold(new Date().toLocaleString())}\n`));

      if (response.view_url) {
        console.log(chalk.blue(`🔗 View: ${response.view_url}\n`));
      }

      // Save last submission
      setLastSubmission(category, new Date().toISOString());
    } catch (error) {
      spinner.fail('Submission failed');
      throw error;
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Submission failed'));
    console.error(chalk.red(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
    process.exit(1);
  }
}
