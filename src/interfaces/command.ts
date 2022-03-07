interface ICommandConfig {
  name: string;
  description: string;
  enabled: boolean;
  cooldown: number;
}

interface ICommand {
  // deno-lint-ignore ban-types
  invoke: Function;
  config: ICommandConfig;
}

export default ICommand;
