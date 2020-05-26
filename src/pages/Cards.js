import React from "react";

import { Card } from "antd";
import { Button } from "antd";

import "../App.css";

import json from "../vocabularyLists/May7th_voc..xlsx - Sheet1.csv.json";

function Cards() {
  const [cards, setCards] = React.useState(json || []);
  const [currentCard, setCurrentCard] = React.useState(0);
  const [currentLanguage, setCurrentLanguage] = React.useState("japanese");

  console.log("json", json);

  return (
    <div className="App">
      <header className="App-header">
        Cards
        {cards && cards.length > 0 && (
          <Card
            title={
              <Button
                type="primary"
                onClick={() => {
                  setCurrentLanguage(
                    currentLanguage === "japanese" ? "english" : "japanese"
                  );
                }}
              >
                Flip
              </Button>
            }
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setCurrentLanguage("japanese");
                  setCurrentCard(currentCard + 1);
                }}
              >
                Next
              </Button>
            }
            style={{ width: 300 }}
          >
            <p>{cards[currentCard][currentLanguage]}</p>
          </Card>
        )}
      </header>
    </div>
  );
}

export default Cards;
