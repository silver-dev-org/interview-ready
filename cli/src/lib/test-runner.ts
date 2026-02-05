import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { Category, TestResult } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Runs tests for a specific category using npm scripts
 * Captures test results using custom reporter
 * Generates MD5 success token
 */
export async function runCategoryTests(category: Category): Promise<TestResult> {
  const spinner = ora(`Running tests for ${category} category...`).start();

  try {
    // Get the repository root (cli is in /cli, tests are in /technical-fundamentals)
    const repoRoot = path.resolve(__dirname, '..', '..', '..');
    const technicalFundamentalsDir = path.join(repoRoot, 'technical-fundamentals');

    // Build the vitest command with custom reporter
    const reporterPath = path.resolve(__dirname, 'custom-reporter.js');

    const command = 'npm';
    const args = [
      'run',
      category,
      '--',
      '--reporter',
      reporterPath,
    ];

    // Run the tests
    const result = await execa(command, args, {
      cwd: technicalFundamentalsDir,
      reject: false,
      all: true,
    });

    // Parse the output to find test results
    const output = result.all || '';
    const resultsMatch = output.match(/__CLI_TEST_RESULTS__:(.+)/);

    if (!resultsMatch) {
      spinner.fail('Failed to parse test results');
      throw new Error('Could not parse test results. Please ensure tests ran correctly.');
    }

    const testResults = JSON.parse(resultsMatch[1]);

    // Check if all tests passed
    if (testResults.failed.length > 0) {
      spinner.fail(`Tests failed (${testResults.passed.length}/${testResults.total} passed)`);

      console.log(chalk.red('\n❌ Error: Tests failed'));
      console.log(chalk.yellow('   Fix failing tests before submitting\n'));
      console.log(chalk.yellow('   Failed tests:'));
      testResults.failed.forEach((testName: string) => {
        console.log(chalk.yellow(`   - ${testName}`));
      });
      console.log();

      throw new Error('Tests must pass before submission');
    }

    // Generate MD5 success token from sorted test names
    const sortedTestNames = testResults.passed.sort();
    const success_token = crypto
      .createHash('md5')
      .update(sortedTestNames.join(''))
      .digest('hex');

    spinner.succeed(`All ${testResults.total} tests passed!`);
    console.log(chalk.gray(`  Success token: ${success_token}\n`));

    return {
      success_token,
      passed_tests: sortedTestNames,
      test_count: testResults.total,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Tests must pass before submission') {
      throw error;
    }

    spinner.fail('Failed to run tests');

    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        throw new Error('npm not found. Please ensure npm is installed.');
      } else if (error.message.includes('script not found')) {
        throw new Error(`Test script "${category}" not found. Check package.json.`);
      }
    }

    throw new Error(`Test execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
