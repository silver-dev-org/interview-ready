import chalk from 'chalk';
import { isAuthenticated, getAuth, getPortalUrl } from '../lib/config.js';
import { PortalAPIClient } from '../lib/api.js';
import { Category } from '../types/index.js';

const CATEGORIES: Category[] = ['strings', 'lists', 'stacks', 'trees', 'recursion'];

const CATEGORY_TEST_COUNTS: Record<Category, number> = {
  strings: 9,
  lists: 9,
  stacks: 6,
  trees: 10,
  recursion: 8,
};

/**
 * Handles the status command
 */
export async function statusCommand(): Promise<void> {
  try {
    // Check authentication
    if (!isAuthenticated()) {
      console.log(chalk.red('\n❌ Error: Not authenticated'));
      console.log(chalk.yellow('   Run "npm run cli:login" to authenticate\n'));
      process.exit(1);
    }

    const auth = getAuth();
    if (!auth) {
      console.log(chalk.red('\n❌ Error: No authentication data found\n'));
      process.exit(1);
    }

    console.log(chalk.bold('\n📊 Your Interview Ready Progress\n'));

    // Fetch submission status from portal
    const portalUrl = getPortalUrl();
    const apiClient = new PortalAPIClient(portalUrl);

    let submissions;
    try {
      submissions = await apiClient.getSubmissionStatus(auth.user_id);
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not fetch submission history from portal'));
      console.log(chalk.gray(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
      return;
    }

    // Create a map of category to submission
    const submissionMap = new Map(
      submissions.map(sub => [sub.category, sub])
    );

    // Display table header
    console.log(chalk.gray('┌────────────┬────────┬────────────┬─────────────────────┐'));
    console.log(chalk.gray('│ Category   │ Status │ Tests      │ Submitted           │'));
    console.log(chalk.gray('├────────────┼────────┼────────────┼─────────────────────┤'));

    // Display each category
    for (const category of CATEGORIES) {
      const submission = submissionMap.get(category);
      const totalTests = CATEGORY_TEST_COUNTS[category];

      let status: string;
      let tests: string;
      let submitted: string;

      if (submission) {
        if (submission.passed_tests === totalTests) {
          status = chalk.green('✓ PASS');
        } else {
          status = chalk.yellow('⚠ PART');
        }
        tests = `${submission.passed_tests}/${totalTests}`;
        submitted = getRelativeTime(submission.submitted_at);
      } else {
        status = chalk.gray('⏳ TODO');
        tests = `0/${totalTests}`;
        submitted = 'Not submitted';
      }

      const paddedCategory = category.padEnd(10);
      const paddedStatus = status.padEnd(6);
      const paddedTests = tests.padEnd(10);
      const paddedSubmitted = submitted.padEnd(19);

      console.log(`│ ${paddedCategory} │ ${paddedStatus} │ ${paddedTests} │ ${paddedSubmitted} │`);
    }

    console.log(chalk.gray('└────────────┴────────┴────────────┴─────────────────────┘\n'));

    // Summary
    const completed = submissions.filter(s => s.passed_tests === CATEGORY_TEST_COUNTS[s.category]).length;
    const total = CATEGORIES.length;

    if (completed === total) {
      console.log(chalk.green.bold(`🎉 Congratulations! You've completed all ${total} categories!\n`));
    } else {
      console.log(chalk.cyan(`Progress: ${completed}/${total} categories completed\n`));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Error fetching status'));
    console.error(chalk.red(`   ${error instanceof Error ? error.message : 'Unknown error'}\n`));
    process.exit(1);
  }
}

/**
 * Converts timestamp to relative time string
 */
function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const submittedAt = new Date(timestamp);
  const diffMs = now.getTime() - submittedAt.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes === 0 ? 'Just now' : `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
}
