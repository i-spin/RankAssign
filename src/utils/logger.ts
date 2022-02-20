import chalk from 'chalk';

/* eslint-disable no-console */
const info = (message: string) => console.log(`${chalk.cyan('[INFO]')} ${message}`);
const warn = (message: string) => console.log(`${chalk.yellow('[WARN]')} ${message}`);
const error = (message: string) => console.log(`${chalk.red('[ERROR]')} ${message}`);

export { info, warn, error };
