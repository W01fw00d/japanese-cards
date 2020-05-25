import React from "react";
import { Card } from "antd";
import { Button } from "antd";

import "./App.css";

//import csv from "./class1_numbers.csv";
import parser from "./cvsToJsonParser.js";

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState(0);
  const [currentLanguage, setCurrentLanguage] = React.useState("japanese");

  const fr = new FileReader();
  fr.onload = function () {
    const json = parser(fr.result);
    setCards(JSON.parse(json));
  };

  React.useEffect(() => {
    document.getElementById("fileupload").addEventListener(
      "change",
      function (e) {
        var files = e.target.files;
        fr.readAsText(files[0]);
      },
      false
    );
  }, [fr]);

  return (
    <div className="App">
      <header className="App-header">
        <div class="form-group">
          <div>
            <label>Upload a CSV formatted file:</label>
          </div>
          <input
            type="file"
            id="fileupload"
            class="form-control"
            accept=".csv"
            required
          />
        </div>
        <div id="output"></div>
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

export default App;
