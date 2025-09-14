#!/usr/bin/env node

import { spawn } from 'child_process';

const vite = spawn('npx', ['vite'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  cwd: process.cwd()
});

const suppressedPatterns = [
  /Deprecation Warning \[legacy-js-api\]/i,
  /More info: https:\/\/sass-lang.com\/d\/legacy-js-api/i,
  /Deprecation Warning \[import\]/i,
  /More info and automated migrator: https:\/\/sass-lang.com\/d\/import/i,
  /@import rules are deprecated/i,
  /A11y: visible, non-interactive elements with an on:click event/i,
];

const filterOutput = (data) => {
  const lines = data.toString().split('\n');
  const filteredLines = lines.filter(line => {
    if (!line || line.trim() === '') return false;
    return !suppressedPatterns.some((re) => re.test(line));
  });

  if (filteredLines.length > 0) {
    process.stdout.write(filteredLines.join('\n') + '\n');
  }
};

vite.stdout.on('data', filterOutput);
vite.stderr.on('data', filterOutput);

vite.on('close', (code) => {
  process.exit(code);
});

// Handle CTRL+C gracefully
process.on('SIGINT', () => {
  vite.kill('SIGINT');
});