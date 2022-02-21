import { Message } from 'discord.js';

import * as database from '../utils/database.js';

const config = {
  name: 'setupRoles',
  description: 'Setup all the roles for ranks',
  usage: ['setupRoles'],
  cooldown: 0,
};

const invoke = (message: Message, _args: string[]) => {
  if (!message.member?.permissions.has('MANAGE_ROLES')) {
    message.reply('You do not have the permission to manage roles!');
    return;
  }

  const roles = new Map()
    .set('X', '#f94ce2')
    .set('U', '#ff1b15')
    .set('SS', '#ffbc35')
    .set('S+', '#e9b52d')
    .set('S', '#e9b52d')
    .set('S-', '#ccbe32')
    .set('A+', '#3dbf35')
    .set('A', '#7cd957')
    .set('A-', '#48ad9b')
    .set('B+', '#509fc4')
    .set('B', '#4457b6')
    .set('B-', '#5552c9')
    .set('C+', '#57308a')
    .set('C', '#723f8f')
    .set('C-', '#826498')
    .set('D+', '#80587f')
    .set('D', '#937895');
  try {
    roles.forEach((value, key: string) => {
      if (message.guild?.roles.cache.find((r) => r.name === key)) {
        database.addRole(message.guild.id ?? '', key, message.guild.roles.cache.find((r) => r.name === key)?.id ?? '');
        return;
      }
      message.guild?.roles.create({
        name: key,
        color: value,
      }).then((role) => {
        database.addRole(message.guild?.id ?? '000000000000000000', role.id, key);
      });
    });
  } catch (err: any) {
    message.reply(`An error occured:\n\`\`\`${err}\`\`\``);
  }
};

export {
  invoke,
  config,
};
