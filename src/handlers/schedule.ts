import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";
import { getJourneysData } from "train-times";

import { apiKey } from "#env";
import { markdownTable } from "#lib/table";
import { convertToTableData, trainTableColumns } from "#lib/train-journeys";

import { HELP_MESSAGE } from "./help";

export async function handleSchedule(
  context: CommandContext<Context>,
): Promise<Message> {
  const args = context.match.split(/\s+/);

  if (args.length !== 2) {
    return context.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const from = args[0]!;
  const to = args[1]!;

  const data = await getJourneysData({ apiKey, from, to });

  const table = markdownTable(convertToTableData(data), trainTableColumns);

  return await context.replyWithRichMessage({ markdown: table });
}
