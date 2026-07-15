export type MarkdownTableDataRow<Column extends string> = Partial<
  Record<Column, string | null>
>;

function markdownTable<Column extends string>(
  data: MarkdownTableDataRow<NoInfer<Column>>[],
  columns: readonly Column[],
): string {
  const colWidths = columns.map((col) => {
    const headerLen = col.length;
    const maxValLen = data.reduce((max, row) => {
      const val = row[col] !== undefined ? String(row[col]) : "";
      return Math.max(max, val.length);
    }, 0);
    return Math.max(headerLen, maxValLen);
  });

  const formatRow = (cells: readonly string[]) => {
    const paddedCells = cells.map((cell, idx) => {
      const padLen = colWidths[idx]! - cell.length;
      return ` ${cell}${" ".repeat(padLen)} `;
    });
    return `|${paddedCells.join("|")}|`;
  };

  const headerRow = formatRow(columns);

  const dividerRow = `|${colWidths
    .map((width) => "-".repeat(width + 2))
    .join("|")}|`;

  const dataRows = data.map((row) => {
    const cells = columns.map((col) => row[col] ?? "");
    return formatRow(cells);
  });

  return [headerRow, dividerRow, ...dataRows].join("\n");
}

export { markdownTable };
