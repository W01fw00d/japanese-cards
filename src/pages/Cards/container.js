import React, { useState } from "react";

import Component from "./component";
import { shuffle } from "./model";

import hiraganajson from "../../jsons/May7th_voc.json";
import general1Json from "../../jsons/General1.json";
import foodJson from "../../jsons/Food.json";
import kanjiJson from "../../jsons/Kanji Summary.json";

export default () => {
  const vocabularyLists = {
    hiragana1: hiraganajson,
    general1: general1Json,
    food: foodJson,
    kanji: kanjiJson,
  };
  const vocabularyListKeys = Object.keys(vocabularyLists);
  const vocabularyListKey0 = vocabularyListKeys[0];
  const shuffleVocabularyList = (key) => shuffle(vocabularyLists[key]);

  const [currentVocabularyListKey, setCurrentVocabularyListKey] = useState(
    vocabularyListKey0
  );

  const [cards, setCards] = useState(shuffleVocabularyList(vocabularyListKey0));

  return (
    <Component
      {...{ cards }}
      {...{ vocabularyListKeys }}
      {...{ currentVocabularyListKey }}
      setCurrentVocabularyListKey={(value) => {
        setCurrentVocabularyListKey(value);
        setCards(shuffleVocabularyList(value));
      }}
    />
  );
};
