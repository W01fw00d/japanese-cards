export default (csv, mapper) => {
  const HEADER_INDEX = 0;
  const SPLITTERS = { ROW: "\n", CELL: "," };

  const rows = csv.split(SPLITTERS.ROW);
  const headers = rows
    .splice(HEADER_INDEX, 1)[0]
    .split(SPLITTERS.CELL)
    .map((header) => header.trim());

  const mappers = {
    hiragana: (row) => ({
      japanese: row.Hiragana,
      english: row.English,
    }),
    kanji: (row) => ({
      japanese: `${row.Hiragana} [${row.Kanji}]`,
      english: row.Meaning,
    }),
  };

  return JSON.stringify(
    rows
      .map((row, index) => {
        const currentRow = row.split(SPLITTERS.CELL);

        return headers.reduce((parsedRow, header, index) => {
          parsedRow[header] = currentRow[index];
          return parsedRow;
        }, {});
      })
      .map(mappers[mapper])
      .filter(
        (row) =>
          !Object.keys(row).some(
            (cellKey) => row[cellKey] === undefined || row[cellKey].length === 0
          )
      )
  );
};
