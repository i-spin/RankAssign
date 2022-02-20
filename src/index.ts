import toml from 'toml';
import fs from 'graceful-fs';
import path from 'path';
import { Client, Intents } from 'discord.js';
import * as logger from './utils/logger';

import Config from './interfaces/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config: Config = toml.parse(fs.readFileSync(path.join('config.toml'), 'utf8'));

const commands = new Map();

fs.readdirSync(path.join(__dirname, 'commands')).forEach((file) => {
  try {
    logger.info(`Trying to load ${file}.`);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const command = require(path.join(__dirname, 'commands', file));
    commands.set(command.config.name, command);
    command.config.aliases.forEach((alias: string) => {
      if (commands.has(alias)) {
        logger.error(`Command ${alias} already exists for ${commands.get(alias).config.name}`);
        return;
      }
      commands.set(alias, command);
    });
    logger.info(`Loaded ${file}.`);
  } catch (err) {
    logger.error(`Failed to load command ${file}.`);
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
  command.invoke(message, args);
});

client.login(config.bot.token);
