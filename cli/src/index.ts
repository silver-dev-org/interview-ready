#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import packageJson from '../package.json' with { type: 'json' };
import { loginCommand } from './commands/login.js';
import { logoutCommand } from './commands/logout.js';
import { submitCommand } from './commands/submit.js';
import { statusCommand } from './commands/status.js';
import { whoamiCommand } from './commands/whoami.js';

const program = new Command();

program
  .name('interview-ready-cli')
  .description('CLI tool for submitting Interview Ready coding challenges')
  .version(packageJson.version);

// Login command
program
  .command('login')
  .description('Authenticate with your Silver account')
  .action(async () => {
    await loginCommand();
  });

// Logout command
program
  .command('logout')
  .description('Sign out from the CLI')
  .action(async () => {
    await logoutCommand();
  });

// Submit command
program
  .command('submit <category>')
  .description('Submit your solutions for a category')
  .action(async (category: string) => {
    await submitCommand(category);
  });

// Status command
program
  .command('status')
  .description('View your submission progress')
  .action(async () => {
    await statusCommand();
  });

// Whoami command
program
  .command('whoami')
  .description('Show current authenticated user')
  .action(async () => {
    await whoamiCommand();
  });

// Display help by default if no command is provided
program.addHelpCommand('help [command]', 'Display help for command');

// Custom help
program.on('--help', () => {
  console.log('');
  console.log(chalk.bold('Examples:'));
  console.log('  $ npm run cli:login');
  console.log('  $ npm run cli:submit strings');
  console.log('  $ npm run cli:status');
  console.log('  $ npm run cli:whoami');
  console.log('  $ npm run cli:logout');
  console.log('');
});

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
