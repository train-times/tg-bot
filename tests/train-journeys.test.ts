import { describe, it, expect } from "bun:test";

import { convertToTableData } from "#lib/train-journeys";

import { example } from "./fixtures/example";

describe("convertToTableData", () => {
  it("should should convert data to a table-realy object", () => {
    expect(convertToTableData(example)).toMatchSnapshot();
  });
});
