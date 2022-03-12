import * as path from "https://esm.sh/path";
import ICommand from "../interfaces/command.ts";

const commands: ICommand[] = [];

for await (const command of Deno.readDir(path.resolve("src", "commands"))) {
  if (command.isFile && command.name.endsWith(".ts")) {
    const commandName = command.name.replace(".ts", "");
    const commandModule = await import(
      path.resolve("src", "commands", `${commandName}.ts`)
    );

    if (commands.filter((cmd) => cmd.config.name === commandName).length > 0) {
      console.log(`Command ${commandName} already exists, skipping.`);
      continue;
    }

    if (!commandModule.config || !commandModule.invoke) {
      console.log(`Command ${commandName} is empty, skipping.`);
      continue;
    }

    commands.push(commandModule);
    console.log(`Loaded command ${commandName}`);
  }
}

export default commands;
