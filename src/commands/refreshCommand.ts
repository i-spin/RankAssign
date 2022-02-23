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

const invoke = (message: Message, _args: string[]) => {
  database.get().guild
    .filter((guild) => guild.id === message.guild?.id)
    .flatMap((guild) => guild.users)
    .filter((user) => user.discord.handle === message.author.id)
    .flatMap((user) => user.tetrio)
    .map(async (tetrio) => {
      const result: TetraUser = await (await fetch(`https://ch.tetr.io/api/users/${tetrio.handle}`)).json() as any;
      message.channel.send(`Your rank is now ${database.getUserById(message.author.id)?.tetrio.rank}`);
      return result.data.user.league.rank.toUpperCase();
    });
};

export {
  invoke,
  config,
};
