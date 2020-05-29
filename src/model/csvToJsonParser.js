export default (csv) => {
  const result = [];

  const rows = csv.split("\n");
  const headers = rows[0].split(",");

  rows.forEach((row, index) => {
    if (0 < index) {
      const parseCurrentRow = () => {
        const currentRow = row.split(",");

        const parsedRow = {};
        headers.forEach((header, index) => {
          parsedRow[header] = currentRow[index];
        });

        return parsedRow;
      };

      result.push(parseCurrentRow());
    }
  });

  const mappedResult = result.map((row) => ({
    japanese: row["\r"],
    english: row.English,
  }));

  return JSON.stringify(mappedResult);
};
