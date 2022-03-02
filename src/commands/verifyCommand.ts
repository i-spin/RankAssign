import { Message, ThreadChannel } from 'discord.js';
import ms from 'ms';
import fs from 'graceful-fs';
import { fileURLToPath } from 'url';
import path from 'path';
import Login from '../interfaces/login.js';

import { authenticate, exists, me } from '../utils/tetrio.js';
import * as database from '../utils/database.js';
import { TetraUser } from '../interfaces/tetraUser.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = {
  name: 'verify',
  description: 'Verifies that you own a TETR.IO account.',
  usage: ['verify', '<discordID>', '<tetrioUsername>'],
  cooldown: ms('30s'),
};

const invoke = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has('MANAGE_ROLES')) {
    message.reply('You do not have permission to use this command.');
  }
  const tetraUser: TetraUser = await ((await fetch(`https://ch.tetr.io/api/users/${args[2]}`)).json());
  if (!tetraUser.success) {
    message.reply('Invalid username.');
    return;
  }
  database.addUser(
    message.guildId ?? '000000000000000000',
    args[0],
    tetraUser.data.user.username,
    tetraUser.data.user.league.rank,
  );
  message.reply(`Added ${args[2]} to the database.`);
};

// eslint-disable-next-line no-unused-vars
const old = async (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.reply(`Missing arguments! Usage: \`${config.usage.join(' ')}\``);
    return;
  }

  let thread: ThreadChannel;
  try {
    thread = await message.startThread({ name: `Account verification for ${message.author.username}#${message.author.discriminator}`, autoArchiveDuration: 60, reason: 'Account verification' });
  } catch (err) {
    message.reply('Failed to start thread.');
    return;
  }
  let userExists;
  try {
    userExists = await exists(args[0]);
    if (!userExists) {
      thread.send(`\`\`\`${JSON.stringify(userExists)}\`\`\``);
      return;
    }
    if (userExists.success && !userExists.exists) {
      thread.send(`Username \`${args[0]}\` is either anonymous, or does not exist.`);
      return;
    }
  } catch (err: any) {
    thread.send(`An error occurred while verifying your account:\n\`\`\`${err.toString()}\`\`\``);
    return;
  }

  fs.writeFileSync(path.join(dirname, '../../temp', `${message.createdTimestamp}.json`), '');
  thread.send(`Paste this as the token into the verification website: ${message.createdTimestamp}`);

  fs.watchFile(path.join(dirname, '../../temp', `${message.createdTimestamp}.json`), async () => {
    // already done
    if (!fs.existsSync(path.join(dirname, '../../temp', `${message.createdTimestamp}.json`))) return;

    const current = fs.readFileSync(path.join(dirname, '../../temp', `${message.createdTimestamp}.json`), 'utf8');
    const loginData: Login = JSON.parse(current);

    let token;
    try {
      token = (await authenticate(loginData.username, loginData.password))?.token;
      if (!token) {
        thread.send('Failed to authenticate.');
        return;
      }
    } catch (err: any) {
      thread.send(`An error occurred while authenticating:\n\`\`\`${err.toString()}\`\`\``);
      return;
    }

    let userData;
    try {
      userData = await me(token);
      if (!userData) {
        thread.send('Failed to get user data.');
        return;
      }
      if (userData.user.connections.discord.username === `${message.author.username}#${message.author.discriminator}`) {
        thread.send('Successfully verified account.');
        database.addUser(
          message.guildId ?? '000000000000000000',
          message.author.id,
          userData.user.username,
          userData.user.league.rank,
        );
        fs.unlinkSync(path.join(dirname, '../../temp', `${message.createdTimestamp}.json`));
        return;
      }
    } catch (err: any) {
      thread.send(`An error occurred while retrieving your account data:\n\`\`\`${err.toString()}\`\`\``);
    }
  });
};

export {
  invoke,
  config,
};
