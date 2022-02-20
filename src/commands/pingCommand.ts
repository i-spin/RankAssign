import { Message } from 'discord.js';

const config = {
  name: 'ping',
  description: 'Ping!',
  usage: ['ping'],
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
