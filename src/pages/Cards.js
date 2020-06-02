import React, { useState } from "react";

import { Card } from "antd";
import { Button } from "antd";

import { Select } from "antd";

import "./Cards.css";

import hiraganajson from "../jsons/May7th_voc.json";
import kanjiJson from "../jsons/Kanji Summary.json";

export default () => {
  const { Option } = Select;

  const vocabularyLists = {
    hiragana1: hiraganajson,
    kanji: kanjiJson,
  };
  const vocabularyListKeys = Object.keys(vocabularyLists);

  const [currentVocabularyListKey, setCurrentVocabularyListKey] = useState(
    vocabularyListKeys[0]
  );
  const [cards, setCards] = useState(vocabularyLists[vocabularyListKeys[0]]);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("japanese");

  const VocabularyListSelect = () => (
    <Select
      defaultValue={currentVocabularyListKey}
      style={{ width: 120 }}
      onChange={(value) => {
        setCurrentVocabularyListKey(value);
        setCards(vocabularyLists[value]);
        setCurrentCard(0);
      }}
    >
      {vocabularyListKeys.map((key) => (
        <Option value={key}>{key}</Option>
      ))}
    </Select>
  );

  const LargeButton = ({ text, onClick, disabled }) => (
    <Button type="primary" size="large" disabled={disabled} {...{ onClick }}>
      {text}
    </Button>
  );

  const FlipButton = () => (
    <LargeButton
      text="Flip"
      onClick={() => {
        setCurrentLanguage(
          currentLanguage === "japanese" ? "english" : "japanese"
        );
      }}
    />
  );

  const NextButton = () => {
    const currentIsLastCard = currentCard >= cards.length - 1;

    return (
      <LargeButton
        text={currentIsLastCard ? "Last card" : "Next"}
        disabled={currentIsLastCard}
        onClick={() => {
          if (!currentIsLastCard) {
            setCurrentLanguage("japanese");
            setCurrentCard(currentCard + 1);
          }
        }}
      />
    );
  };

  return (
    <>
      <VocabularyListSelect />
      {cards && cards.length > 0 && (
        <Card
          title={<FlipButton />}
          extra={<NextButton />}
          style={{ width: 300, marginTop: "80px" }}
        >
          <p className="big-font">{cards[currentCard][currentLanguage]}</p>
        </Card>
      )}
    </>
  );
};
