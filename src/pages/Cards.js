import React, { useState } from "react";

import { Card } from "antd";
import { Button } from "antd";

import "./Cards.css";

import json from "../vocabularyLists/May7th_voc..xlsx - Sheet1.csv.json";

export default () => {
  const [cards, setCards] = useState(json || []);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("japanese");

  const LargeButton = ({ text, onClick }) => (
    <Button type="primary" size="large" {...{ onClick }}>
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

  const NextButton = () => (
    <LargeButton
      text="Next"
      onClick={() => {
        setCurrentLanguage("japanese");
        setCurrentCard(currentCard + 1);
      }}
    />
  );

  return (
    <>
      {cards && cards.length > 0 && (
        <Card
          title={<FlipButton />}
          extra={<NextButton />}
          style={{ width: 300 }}
        >
          <p className="big-font">{cards[currentCard][currentLanguage]}</p>
        </Card>
      )}
    </>
  );
};
