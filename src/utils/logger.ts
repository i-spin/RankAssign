/* eslint-disable no-console */
const info = (message: string) => console.log(`[INFO] ${message}`);
const warn = (message: string) => console.log(`[WARN] ${message}`);
const error = (message: string) => console.log(`[ERROR] ${message}`);

export { info, warn, error };
