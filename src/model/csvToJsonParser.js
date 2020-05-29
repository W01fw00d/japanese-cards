export default (csv) => {
  const HEADER_INDEX = 0;
  const ROWS_SPLITTER = "\n";
  const CELL_SPLITTER = ",";

  const rows = csv.split(ROWS_SPLITTER);

  const headers = rows[HEADER_INDEX].split(CELL_SPLITTER);
  const rowsReducer = (result, row, index) => {
    if (index > HEADER_INDEX) {
      const currentRow = row.split(CELL_SPLITTER);
      const currentRowReducer = (parsedRow, header, index) => {
        parsedRow[header] = currentRow[index];
        return parsedRow;
      };

      result.push(headers.reduce(currentRowReducer, {}));
    }

    return result;
  };

  const csvMappingA = (row) => ({
    japanese: row["\r"],
    english: row.English,
  });

  return JSON.stringify(rows.reduce(rowsReducer, []).map(csvMappingA));
};
