import * as path from "https://esm.sh/path";
import ICommand from "../interfaces/command.ts";

const commands: ICommand[] = [];

for await (const command of Deno.readDir(path.resolve("src", "commands"))) {
  if (command.isFile && command.name.endsWith(".ts")) {
    const commandName = command.name.replace(".ts", "");
    const commandModule = await import(
      path.resolve("src", "commands", `${commandName}.ts`)
    );
    commands.push(commandModule);
  }
}

export default commands;
