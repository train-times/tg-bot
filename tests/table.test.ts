import { describe, it, expect } from "bun:test";

import { markdownTable } from "#lib/table";
import { convertToTableData, trainTableColumns } from "#lib/train-journeys";

import { example } from "./fixtures/example";

describe("markdownTable", () => {
  it("should should convert data to a markdown table", () => {
    expect(
      markdownTable(convertToTableData(example), trainTableColumns),
    ).toMatchSnapshot();
  });
});
