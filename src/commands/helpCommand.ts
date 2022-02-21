import { Message, MessageEmbed } from 'discord.js';
import ms from 'ms';
import { commands } from '../index.js';

const config = {
  name: 'help',
  description: 'Gets information on all the commands.',
  usage: ['help'],
  cooldown: 0,
};

const invoke = (message: Message) => {
  message.channel.send('Here\'s a list of all the commands:');
  const embed = new MessageEmbed();
  embed.setTitle('RankAssign');
  embed.setColor('#0099ff');
  embed.setTimestamp();
  commands.forEach((value, key) => {
    embed.addField(key, `**Description:**\n${value.config.description}\n**Usage:**\n\`${value.config.usage.join(' ')}\`\n**Cooldown:**\n${ms(value.config.cooldown)}`);
  });
  message.channel.send({ embeds: [embed] });
};

export {
  invoke,
  config,
};
