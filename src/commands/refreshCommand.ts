import { Message } from 'discord.js';
import ms from 'ms';
import fetch from 'node-fetch';
import { TetraUser } from '../interfaces/tetraUser.js';

import * as database from '../utils/database.js';

const config = {
  name: 'refresh',
  description: 'Refresh the rank for you.',
  usage: ['pirefreshng'],
  cooldown: ms('10m'),
};

const invoke = (message: Message, args: string[]) => {
  if (args[0] === 'guild') {
    if (!message.member?.permissions.has('MANAGE_ROLES')) {
      message.channel.send('You don\'t have permission to do that.');
      return;
    }

    database.get().guild
      .find((guild) => guild.id === message.guild?.id)?.users
      .forEach(async (user) => {
        const tetrioUser = database.getUserById(user.discord.handle);
        if (!tetrioUser) {
          message.reply(`Could not find user ${user.discord.handle} in database.`);
          return;
        }
        const result: TetraUser = await (await fetch(`https://ch.tetr.io/api/users/${tetrioUser.tetrio.handle}`)).json() as any;
        if (!result.success) {
          message.reply(`Failed to update rank for user ${user.discord.handle}`);
          return;
        }
        tetrioUser.tetrio.rank = result.data.user.league.rank;
      });
  }

  database.get().guild
    .filter((guild) => guild.id === message.guild?.id)
    .flatMap((guild) => guild.users)
    .filter((user) => user.discord.handle === message.author.id)
    .flatMap((user) => user.tetrio)
    .map(async (tetrio) => {
      const result: TetraUser = await (await fetch(`https://ch.tetr.io/api/users/${tetrio.handle}`)).json() as any;
      if (!result.success) {
        message.reply(`Failed to update rank for user ${tetrio.handle}`);
        return tetrio.rank;
      }
      message.channel.send(`Your rank is now ${database.getUserById(message.author.id)?.tetrio.rank}`);
      return result.data.user.league.rank.toUpperCase();
    });
  database.save();
};

export {
  invoke,
  config,
};
