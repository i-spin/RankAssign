import { Message } from 'discord.js';

const config = {
  name: 'whois',
  description: 'Look up a user\'s information.',
  usage: ['whois', '<username>'],
  cooldown: 0,
};

const invoke = (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply('Pong!');
  } else {
    message.channel.send(args.toString());
  }
};

export {
  invoke,
  config,
};
