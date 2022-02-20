interface Bot {
  token: string;
  prefix: string;
}

interface Server {
  port: number;
}

interface Config {
  bot: Bot;
  server: Server;
}

export default Config;
