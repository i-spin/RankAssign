import yaml from 'yaml';
import fs from 'graceful-fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { Database } from '../interfaces/database.js';
import * as logger from '../utils/logger.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let database: Database;

const load = () => {
  database = yaml.parse(fs.readFileSync(path.join(dirname, '../../db.yml'), 'utf8'));
  try {
    !database.users ? fakeFile() : null;
  } catch (err) {
    logger.error('Database is empty or corrupted, regenerating database...');
    fakeFile();
  }
};

const save = () => {
  fs.writeFileSync(path.join(dirname, '../../db.yml'), yaml.stringify(database));
  load();
};

const fakeFile = () => {
  database = {
    users: [
      {
        discord: {
          handle: '000000000000000000',
        },
        tetrio: {
          handle: 'Wumpus',
          rank: 'X',
        },
      },
    ],
  };
  save();
};

const addUser = (discord: string, tetrio: string, rank: string) => {
  database.users.push(
    {
      discord: {
        handle: discord,
      },
      tetrio: {
        handle: tetrio,
        rank,
      },
    },
  );
  save();
};

export {
  fakeFile,
  load,
  save,
  addUser,
};
