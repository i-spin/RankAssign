import toml from 'toml';
import fs from 'graceful-fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Client, Intents } from 'discord.js';
import ms from 'ms';

import * as logger from './utils/logger.js';
import Config from './interfaces/config.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config: Config = toml.parse(fs.readFileSync(path.join('config.toml'), 'utf8'));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const commands = new Map();
const lastUsed = new Map();

fs.readdirSync(path.join(dirname, 'commands')).forEach(async (file) => {
  try {
    logger.info(`Trying to load ${file}.`);
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

client.once('ready', () => {
  client.user?.setPresence({ activities: [{ name: 'on TETR.IO', type: 'COMPETING' }], status: 'online' });
});

client.on('message', (message) => {
  if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;

  const args = message.content.slice(config.bot.prefix.length).split(/ +/);
  const name = args.shift()?.toLowerCase();
  if (!commands.has(name)) return;
  const command = commands.get(name);
  if ((Date.now() - lastUsed.get(name)) < command.config.cooldown) {
    message.reply(`Wait ${ms(command.config.cooldown - (Date.now() - lastUsed.get(name)))} before using this command again.`);
    return;
  }
  command.invoke(message, args);
  lastUsed.set(name, Date.now());
});

client.login(config.bot.token);
