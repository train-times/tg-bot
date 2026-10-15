import { run } from "@grammyjs/runner";
import { Bot, GrammyError } from "grammy";

import { token } from "./env";
import { handleHelp } from "./handlers/help";
import { handleSchedule } from "./handlers/schedule";
import { handleStations } from "./handlers/stations";

const bot = new Bot(token);

const m = bot.on("message");

m.command(["start", "help"], handleHelp);
m.command(["schedule", "time", "trains"], handleSchedule);
m.command(["stations"], handleStations);

void bot.api.setMyCommands([
  { command: "help", description: "Help" },
  { command: "schedule", description: "Trains Schedule" },
  { command: "stations", description: "Station Codes" },
]);

bot.catch(({ ctx, error }) => {
  console.error("\n");
  console.error("-".repeat(50));
  console.error(`Error while handling update ${ctx.update.update_id}`);
  console.error("-".repeat(50));

  if (ctx.msg) {
    console.log(ctx.msg);
    console.error("-".repeat(50));
  }

  if (error instanceof GrammyError) {
    console.error("Error in request:\n");
    console.error(error.description);
  } else if (Error.isError(error)) {
    console.error(`Unknown error (${error.name}):\n`);
    console.error(error);
  } else {
    console.error("Unknown error:");
    console.error(error);
  }

  console.error("-".repeat(50), "\n");
});

const runner = run(bot);
const stopRunner = () => runner.isRunning() && runner.stop();

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
