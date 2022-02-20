import { Message } from 'discord.js';

const invoke = (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply('Pong!');
  } else {
    message.channel.send(args.toString());
  }
};

const config = {
  name: 'ping',
  description: 'Ping!',
  usage: ['ping'],
  aliases: ['pong'],
};

export {
  invoke,
  config,
};
