import { Message } from "https://deno.land/x/harmony@v2.6.0/mod.ts";

const invoke = (message: Message, args: []) => {
  message.reply(
    `Pong!\nArgs: ${args.join(", ")}`,
  );
};

const config = {
  name: "ping",
  description: "Ping!",
  enabled: true,
  cooldown: 0,
  usage: ["ping"],
};

export { config, invoke };
