import { run } from "@grammyjs/runner";
import { Bot, GrammyError } from "grammy";

import { token } from "./env";
import { handleHelp } from "./handlers/help";
import { handleSchedule } from "./handlers/schedule";

const bot = new Bot(token);

const m = bot.on("message");

m.command(["start", "help"], handleHelp);
m.command(["schedule", "time", "trains"], handleSchedule);
m.command(["stations"], handleSchedule);

void bot.api.setMyCommands([
  { command: "help", description: "Help" },
  { command: "schedule", description: "Trains Schedule" },
  { command: "stations", description: "Station Codes" },
]);

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else {
    console.error("Unknown error:", error);
  }
});

const runner = run(bot);
const stopRunner = () => runner.isRunning() && runner.stop();

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
