import { Message } from "https://deno.land/x/harmony@v2.6.0/mod.ts";

const invoke = (message: Message, args: []) => {
  message.reply(
    `Pong! ${Date.now() - message.timestamp.getMilliseconds()}ms.
    Args: ${args.join(", ")}`,
  );
};

const config = {
  name: "ping",
  description: "Ping!",
  enabled: true,
  cooldown: 0,
};

export { config, invoke };
