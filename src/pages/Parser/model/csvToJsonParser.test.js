import parser from "./csvToJsonParser";

const parseParseResultToJsObject = (csv, mapper) =>
  JSON.parse(parser(csv, mapper));

test("Parse 'May7th_voc.csv'", () => {
  const [firstResult] = parseParseResultToJsObject(
    "Topic,Lesson,phrase/word,English,Hiragana\n" +
      "1,1,ohayoo gozaimasu,good morning,おはようございます\n",
    "hiragana"
  );

  expect(firstResult.english).toBe("good morning");
  expect(firstResult.japanese).toBe("おはようございます");
});

test("Parse 'Kanji Summay.csv'", () => {
  const [firstResult] = parseParseResultToJsObject(
    "Hiragana,Kanji,Meaning\nくち,口,Mouth\nめ,目,Eye",
    "kanji"
  );

  expect(firstResult.english).toBe("Mouth");
  expect(firstResult.japanese).toBe("くち [口]");
});

test("If any cell is empty, all row should be ignored", () => {
  const [firstResult] = parseParseResultToJsObject(
    "Topic,Lesson,phrase/word,English,Hiragana\n" +
      "1,1,ohayoo gozaimasu,,おはようございます\n" +
      ",,konnichiwa,hello,こんにちは",
    "hiragana"
  );

  expect(firstResult.english).toBe("hello");
  expect(firstResult.japanese).toBe("こんにちは");
});
