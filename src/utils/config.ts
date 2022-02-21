import yaml from 'yaml';
import fs from 'graceful-fs';
import { fileURLToPath } from 'url';
import path from 'path';

import Config from '../interfaces/config.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let config: Config;

const load = () => {
  config = yaml.parse(fs.readFileSync(path.join(dirname, '../../config.yml'), 'utf8'));
};

const save = () => {
  fs.writeFileSync(path.join(dirname, '../../config.yml'), yaml.stringify(config));
  load();
};

const get = () => {
  load();
  return config;
};

export {
  load,
  save,
  get,
};
