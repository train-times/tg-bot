import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

export const HELP_MESSAGE = `
*Examples*

${"`/schedule BSK WIN`"}  —  From Basingstoke to Winchester
`;

export function handleHelp(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  return context.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" });
}
