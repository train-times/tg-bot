import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";
import {
  ApiError,
  getJourneysData,
  type NormalizedTrainServicesData,
} from "train-times";

import { apiKey } from "#env";
import { markdownTable } from "#lib/table";
import { convertToTableData, trainTableColumns } from "#lib/train-journeys";

import { HELP_MESSAGE } from "./help";

const DEFAULT_TIME_OFFSET = 0;
const DEFAULT_TIME_WINDOW = 150; // 2.5 hours

export async function handleSchedule(
  context: CommandContext<Context>,
): Promise<Message> {
  const args = context.match.split(/\s+/);

  if (args.length !== 2) {
    return context.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const from = args[0]!.toUpperCase();
  const to = args[1]!.toUpperCase();

  let data: NormalizedTrainServicesData;

  try {
    data = await getJourneysData({
      apiKey,
      from,
      to,
      timeOffset: DEFAULT_TIME_OFFSET,
      timeWindow: DEFAULT_TIME_WINDOW,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      await context.reply(`An API error occured: ${error.message}`);
    }
    throw error;
  }

  if (!data.journeys?.length) {
    return await context.reply(
      `No upcoming trains from ${data.fromName} to ${data.toName} found`,
    );
  }

  const table = markdownTable(
    convertToTableData(data.journeys),
    trainTableColumns,
  );

  const markdown = `# Upcoming trains from ${data.fromName} to ${data.toName}\n\n---\n\n${table}`;

  return await context.replyWithRichMessage({ markdown });
}
