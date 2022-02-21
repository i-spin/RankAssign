import { Message, MessageEmbed } from 'discord.js';
import * as database from '../utils/database.js';

const config = {
  name: 'whois',
  description: 'Look up a user\'s information.',
  usage: ['whois', '<discord || tetrio username>'],
  cooldown: 0,
};

const invoke = (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply('Provide at least 1 argument!');
    return;
  }
  const result = database.get().guild
    .filter((g) => g.id === message.guildId)
    .flatMap((g) => g.users)
    .find((u) => u.discord.handle === args[0] || u.tetrio.handle === args[0]);

  if (!result) {
    message.reply('User not found!');
    return;
  }
  const embed = new MessageEmbed();
  embed.setTitle(`${args[0]}'s information`);
  embed.setColor('#0099ff');
  embed.addField('Discord', `${result.discord.handle}\n${message.client.users.cache.find((u) => u.id === result.discord.handle)?.username}`, true);
  embed.addField('Tetrio', `${result.tetrio.handle}`, true);
  embed.addField('Rank', `${result.tetrio.rank}`, true);
  message.channel.send({ embeds: [embed] });
};

export {
  invoke,
  config,
};
