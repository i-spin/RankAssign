import { Message } from 'discord.js';
import ms from 'ms';

import * as database from '../utils/database.js';

const config = {
  name: 'assignRoles',
  description: 'Reassign every verified user a role based on their rank',
  usage: ['assignRoles'],
  cooldown: ms('30s'),
};

const invoke = (message: Message, _args: string[]) => {
  if (!message.member?.permissions.has('MANAGE_ROLES')) {
    message.reply('You do not have the permission to manage roles!');
    return;
  }

  database.get().guild
    .filter((guild) => guild.id === message.guild?.id)
    .flatMap((guild) => guild.users)
    .forEach((user) => {
      const tetrioRank = user.tetrio.rank;
      const discordRole = message.guild?.roles.cache
        .find((r) => r.name.toLowerCase() === tetrioRank);
      if (!discordRole) {
        message.reply(`Could not find role for rank ${tetrioRank} for user ${user.discord.handle}`);
        return;
      }
      message.member?.roles.add(discordRole);
    });
};

export {
  invoke,
  config,
};
