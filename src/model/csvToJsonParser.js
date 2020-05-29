export default (csv) => {
  const parseRows = () => {
    const headerIndex = 0;
    const rows = csv.split("\n");
    const headers = rows[headerIndex].split(",");

    return rows.reduce((result, row, index) => {
      if (index > headerIndex) {
        const parseCurrentRow = () => {
          const currentRow = row.split(",");
          return headers.reduce((parsedRow, header, index) => {
            parsedRow[header] = currentRow[index];
            return parsedRow;
          }, {});
        };

        result.push(parseCurrentRow());
      }
      return result;
    }, []);
  };

  const csvMappingA = (row) => ({
    japanese: row["\r"],
    english: row.English,
  });

  return JSON.stringify(parseRows().map(csvMappingA));
};
