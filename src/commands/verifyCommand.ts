import { Message } from 'discord.js';

const config = {
  name: 'verify',
  description: 'Verifies that you own a TETR.IO account.',
  usage: ['verify', '<username>'],
};

const invoke = (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply(`Missing arguments! Usage: \`${config.usage.join(' ')}\``);
  } else {
    message.channel.send(args.join(' '));
  }
};

export {
  invoke,
  config,
};
