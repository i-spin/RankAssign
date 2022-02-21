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
    if (!database.guild) fakeFile();
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
    guild: [
      {
        id: '000000000000000000',
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
        roles: new Map().set('H', '000000000000000000'),
      },
    ],
  };
  save();
};

const addUser = (guild: string, discord: string, tetrio: string, rank: string) => {
  load();
  if (!database.guild.find((g) => g.id === guild)) {
    database.guild.push({
      id: guild,
      users: [],
      roles: new Map().set('H', '000000000000000000'),
    });
  }
  database.guild.find((g) => g.id === guild)?.users.push({
    discord: {
      handle: discord,
    },
    tetrio: {
      handle: tetrio,
      rank,
    },
  });
  save();
};

const get = () => {
  load();
  return database;
};

const addRole = (guild: string, id: string, name: string) => {
  load();
  database.guild.find((g) => g.id === guild)?.roles.set(id, name);
  save();
};

export {
  get,
  fakeFile,
  load,
  save,
  addUser,
  addRole,
};
