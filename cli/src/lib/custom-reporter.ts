import type { Reporter, File, Task } from 'vitest';

interface TestResults {
  passed: string[];
  failed: string[];
  total: number;
}

/**
 * Custom Vitest reporter that captures test results as JSON
 * Outputs results to stdout for CLI to parse
 */
export class CLIReporter implements Reporter {
  private results: TestResults = {
    passed: [],
    failed: [],
    total: 0,
  };

  onInit() {
    // Reset results at start
    this.results = {
      passed: [],
      failed: [],
      total: 0,
    };
  }

  onFinished(files?: File[]) {
    if (!files) return;

    // Collect all test results
    files.forEach(file => {
      this.collectTests(file.tasks);
    });

    // Output results as JSON to stdout
    // Use a special prefix so CLI can parse it
    console.log('__CLI_TEST_RESULTS__:' + JSON.stringify(this.results));
  }

  private collectTests(tasks: Task[]) {
    tasks.forEach(task => {
      if (task.type === 'test') {
        this.results.total++;

        if (task.result?.state === 'pass') {
          this.results.passed.push(task.name);
        } else if (task.result?.state === 'fail') {
          this.results.failed.push(task.name);
        }
      }

      // Recursively collect from nested tasks (describe blocks)
      // Task can be a suite which has tasks property
      if ('tasks' in task && task.tasks) {
        this.collectTests(task.tasks);
      }
    });
  }
}

export default CLIReporter;
