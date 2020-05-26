import React from "react";

import parser from "../cvsToJsonParser.js";

import "../App.css";

export default function Parser() {
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
        Parser
        <div>Upload a CSV formatted file:</div>
        <input type="file" id="fileupload" accept=".csv" required />
        <div id="output"></div>
      </header>
    </div>
  );
}
