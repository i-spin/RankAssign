import fs from 'graceful-fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Client, Intents } from 'discord.js';
import ms from 'ms';

import * as logger from './utils/logger.js';
import * as database from './utils/database.js';
import Config from './interfaces/config.js';
import * as config from './utils/config.js';
import app from './server/login.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const botConfig: Config = config.get();

const commands = new Map();
const lastUsed = new Map();

fs.readdirSync(path.join(dirname, 'commands')).forEach(async (file) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const command = await import(path.join(dirname, 'commands', file));
    commands.set(command.config.name, command);
    lastUsed.set(command.config.name, 0);
    logger.info(`Loaded ${file}.`);
  } catch (err: any) {
    logger.error(`Failed to load command ${file}.`);
    logger.error(err.toString());
  }
});

logger.info('Loading database...');
database.load();

logger.info('Starting express server...');
app.listen(botConfig.server.port, () => {
  logger.info(`Listening on port ${botConfig.server.port}.`);
});

client.once('ready', () => {
  logger.info(`Loaded ${commands.size} commands.`);
  client.user?.setPresence({ activities: [{ name: 'on TETR.IO', type: 'COMPETING' }], status: 'online' });
});

client.on('message', (message) => {
  if (!message.content.startsWith(botConfig.bot.prefix) || message.author.bot) return;

  const args = message.content.slice(botConfig.bot.prefix.length).split(/ +/);
  const name = args.shift();
  if (!commands.has(name)) return;
  const command = commands.get(name);
  if ((Date.now() - lastUsed.get(name)) < command.config.cooldown) {
    message.reply(`Wait ${ms(command.config.cooldown - (Date.now() - lastUsed.get(name)))} before using this command again.`);
    return;
  }
  command.invoke(message, args);
  lastUsed.set(name, Date.now());
});

client.login(botConfig.bot.token);

export {
  // eslint-disable-next-line import/prefer-default-export
  commands,
};
