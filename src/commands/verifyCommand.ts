import { Message } from 'discord.js';
import fetch from 'node-fetch';
import Exists from '../interfaces/exists.js';
import * as logger from '../utils/logger.js';

const config = {
  name: 'verify',
  description: 'Verifies that you own a TETR.IO account.',
  usage: ['verify', '<username>'],
};

const invoke = (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply(`Missing arguments! Usage: \`${config.usage.join(' ')}\``);
  }
  fetch(`https://tetr.io/api/users/${args[0]}/exists`)
    .then((res) => res.json())
    .then((data) => {
      if (!(data as Exists).success) {
        message.reply(`Failed to verify ${args[0]}, try again later.`);
      }
      if (!(data as Exists).exists) {
        message.reply('You are not allowed to verify an anonymous acocunt!');
      } else {
        message.reply(`${args[0]} is verified!`);
      }
    })
    .catch((err) => {
      logger.error(err);
      message.reply('Failed to verify, try again later.');
    });
};

export {
  invoke,
  config,
};
