import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { Category, SolutionFile } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Maps category to problem file ranges
 */
const CATEGORY_FILE_MAP: Record<Category, { start: number; end: number }> = {
  strings: { start: 1, end: 9 },
  lists: { start: 10, end: 19 },
  stacks: { start: 21, end: 26 },
  trees: { start: 30, end: 39 },
  recursion: { start: 41, end: 48 },
};

/**
 * Gets problem file paths for a category by finding all files
 * in the test directory
 */
async function getProblemFilesForCategory(category: Category): Promise<string[]> {
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const testDir = path.join(repoRoot, 'technical-fundamentals', '__tests__', category);

  try {
    const files = await fs.readdir(testDir);
    const testFiles = files.filter(f => f.endsWith('.test.ts') || f.endsWith('.test.js'));

    // Extract problem IDs from test file names and find corresponding solution files
    const problemFiles: string[] = [];

    for (const testFile of testFiles) {
      // Test files are typically named like "isUnique.test.ts"
      // We need to find the corresponding problem file
      const baseName = testFile.replace(/\.test\.(ts|js)$/, '');

      // Try to find the problem file number by searching in the problems directory
      const problemsDir = path.join(repoRoot, 'technical-fundamentals', 'coding', 'problems');
      const problemDirFiles = await fs.readdir(problemsDir);

      // Find files that match the pattern and base name
      const matchingFile = problemDirFiles.find((f: string) => {
        return f.toLowerCase().includes(baseName.toLowerCase()) &&
               (f.endsWith('.ts') || f.endsWith('.js'));
      });

      if (matchingFile) {
        problemFiles.push(matchingFile);
      }
    }

    return problemFiles;
  } catch (error) {
    throw new Error(`Failed to read test directory for ${category}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Collects all solution files for a category
 * Returns array of solution file objects with code and hash
 */
export async function collectSolutions(category: Category): Promise<SolutionFile[]> {
  const spinner = ora('Collecting solution files...').start();

  try {
    const repoRoot = path.resolve(__dirname, '..', '..', '..');
    const problemsDir = path.join(repoRoot, 'technical-fundamentals', 'coding', 'problems');

    // Get all problem files for this category
    const problemFiles = await getProblemFilesForCategory(category);

    if (problemFiles.length === 0) {
      spinner.fail('No solution files found');
      throw new Error(`No solution files found for category: ${category}`);
    }

    const solutions: SolutionFile[] = [];

    for (const fileName of problemFiles) {
      const filePath = path.join(problemsDir, fileName);

      try {
        // Read solution code
        const code = await fs.readFile(filePath, 'utf-8');

        // Generate SHA256 hash
        const code_hash = crypto
          .createHash('sha256')
          .update(code)
          .digest('hex');

        // Extract problem ID from filename (e.g., "01_isUnique.ts" -> "01")
        const problemIdMatch = fileName.match(/^(\d+)_/);
        const problem_id = problemIdMatch ? problemIdMatch[1] : fileName;

        solutions.push({
          problem_id,
          file_path: path.relative(repoRoot, filePath),
          code,
          code_hash,
        });

        spinner.text = `Collecting solution files... (${solutions.length}/${problemFiles.length})`;
      } catch (error) {
        spinner.warn(`Could not read file: ${fileName}`);
        console.log(chalk.yellow(`  Warning: Skipping ${fileName}`));
      }
    }

    spinner.succeed(`Collected ${solutions.length} solution files`);

    // Show collected files
    solutions.forEach((sol: SolutionFile) => {
      console.log(chalk.gray(`  ✓ ${path.basename(sol.file_path)}`));
    });
    console.log();

    return solutions;
  } catch (error) {
    spinner.fail('Failed to collect solution files');
    throw error;
  }
}
