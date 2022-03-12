import yaml from "https://esm.sh/yaml@next";
import * as harmony from "https://deno.land/x/harmony@v2.6.0/mod.ts";
import commands from "./controllers/commandController.ts";
import IConfig from "./interfaces/config.ts";
import initDB from "./controllers/databaseController.ts";

const client = new harmony.Client();
const config: IConfig = yaml.parse(Deno.readTextFileSync("config.yml"));
initDB();

const intents = [
  harmony.GatewayIntents.GUILDS,
  harmony.GatewayIntents.GUILD_MESSAGES,
];

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const prefix = config.prefix;
  const content = message.content.trim();
  const args = content.slice(prefix.length).split(/ +/);
  const commandName = args.shift();

  if (!content.startsWith(prefix) || message.author.bot) return;

  try {
    const command = commands.find((command) =>
      command.config.name === commandName
    );

    if (!command) {
      message.reply("Unknown command.");
      return;
    }

    if (command.config.enabled === false) {
      message.reply("This command is disabled.");
      return;
    }

    command.invoke(message, args);
  } catch (e) {
    message.reply(e);
  }
});

client.connect(config.token, intents);
