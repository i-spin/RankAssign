import toml from 'toml';
import fs from 'graceful-fs';
import path from 'path';

const config = toml.parse(fs.readFileSync(path.join('config.toml'), 'utf8'));

console.log(config);
