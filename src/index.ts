import yaml from "https://esm.sh/yaml@next";
import * as harmony from "https://deno.land/x/harmony@v2.6.0/mod.ts";
import commands from "./controllers/commandController.ts";
import IConfig from "./interfaces/config.ts";

const client = new harmony.Client();
const config: IConfig = yaml.parse(Deno.readTextFileSync("config.yml"));
const intents = [
  harmony.GatewayIntents.GUILDS,
  harmony.GatewayIntents.GUILD_MESSAGES,
];

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const prefix = "!";
  const content = message.content.trim();
  const args = content.slice(prefix.length).split(/ +/);
  const commandName = args.shift();

  if (!content.startsWith(prefix)) return;

  const command = commands.find((command) =>
    command.config.name === commandName
  );

  if (!command) return;

  if (command.config.enabled === false) {
    message.reply("This command is disabled.");
    return;
  }

  command.invoke(message, args);
});

client.connect(config.token, intents);
