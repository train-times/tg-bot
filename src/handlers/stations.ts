import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

export const HELP_MESSAGE = `
*Station codes*

${"`BSK`"}  —  Basingstoke
${"`WIN`"}  —  Winchester
${"`RDG`"}  —  Reading
${"`WAT`"}  —  London Waterloo
`;

export function handleStations(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  return context.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" });
}
