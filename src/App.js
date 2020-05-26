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

  let currentFileName = "untitled";

  const fr = new FileReader();
  fr.onload = function () {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(parser(fr.result))
    );
    element.setAttribute("download", `${currentFileName || "example"}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click(); //Execute download
    document.body.removeChild(element);

    //setCards(JSON.parse(json));
  };

  React.useEffect(() => {
    document.getElementById("fileupload").addEventListener(
      "change",
      function (e) {
        var files = e.target.files;
        currentFileName = files[0].name;
        fr.readAsText(files[0]);
      },
      false
    );
  }, [fr]);

  return (
    <div className="App">
      <header className="App-header">
        <div>Upload a CSV formatted file:</div>
        <input type="file" id="fileupload" accept=".csv" required />
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
