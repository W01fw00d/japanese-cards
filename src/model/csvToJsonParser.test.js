import parser from "./csvToJsonParser";

const parseParseResultToJsObject = (csv) => JSON.parse(parser(csv));

test("parse exampleA.csv", () => {
  const [firstResult] = parseParseResultToJsObject(
    "Topic,Lesson,phrase/word,English,\r\n" +
      "1,1,ohayoo gozaimasu,good morning,おはようございます\n"
  );

  expect(firstResult.english).toBe("good morning");
  expect(firstResult.japanese).toBe("おはようございます");
});
