import React, { useState } from "react";

import { Card, Button, Select } from "antd";

import "./component.css";

export default ({
  cards,
  vocabularyListKeys,
  currentVocabularyListKey,
  setCurrentVocabularyListKey,
}) => {
  const { Option } = Select;

  const [currentCard, setCurrentCard] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("japanese");

  const VocabularyListSelect = () => (
    <Select
      defaultValue={currentVocabularyListKey}
      style={{ width: 120 }}
      onChange={(value) => {
        setCurrentCard(0);
        setCurrentLanguage("japanese");
        setCurrentVocabularyListKey(value);
      }}
    >
      {vocabularyListKeys.map((key) => (
        <Option {...{ key }} value={key}>
          {key}
        </Option>
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
