import React, { useState } from "react";

import { Card } from "antd";
import { Button } from "antd";

import "./Cards.css";

import json from "../jsons/May7th_voc.json";

export default () => {
  const [cards] = useState(json || []);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("japanese");

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
