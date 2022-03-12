import { Embed } from "https://deno.land/x/harmony@v2.6.0/mod.ts";
import palette from "./colorPalette.ts";

const error = (e: Error) => {
  return new Embed()
    .setTitle("An error occurred!")
    .setDescription(`${e.name}: ${e.message}`)
    .addField("Stacktrace", e.stack ?? "No stacktrace available.")
    .setColor(palette.error);
};

const warning = (message: string) => {
  return new Embed()
    .setTitle("Warning!")
    .setDescription(message)
    .setColor(palette.warning);
};

const success = (message: string) => {
  return new Embed()
    .setTitle("Success!")
    .setDescription(message)
    .setColor(palette.success);
};

const info = (message: string) => {
  return new Embed()
    .setTitle("Info!")
    .setDescription(message)
    .setColor(palette.info);
};

export { error, info, success, warning };
