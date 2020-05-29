export default (csv) => {
  const HEADER_INDEX = 0;
  const SPLITTERS = { ROW: "\n", CELL: "," };

  const rows = csv.split(SPLITTERS.ROW);
  const headers = rows.splice(HEADER_INDEX, 1)[0].split(SPLITTERS.CELL);

  const csvMappingA = (row) => ({
    japanese: row["\r"],
    english: row.English,
  });

  return JSON.stringify(
    rows
      .map((row, index) => {
        const currentRow = row.split(SPLITTERS.CELL);
        return headers.reduce((parsedRow, header, index) => {
          parsedRow[header] = currentRow[index];
          return parsedRow;
        }, {});
      })
      .map(csvMappingA)
  );
};
