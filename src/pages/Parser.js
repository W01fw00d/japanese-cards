import React, { useRef, useEffect } from "react";

import parser from "../model/csvToJsonParser.js";

export default () => {
  const mapper = "hiragana";
  //const mapper = "kanji";

  const fileName = useRef("untitled");

  const fileReader = new FileReader();
  fileReader.onload = function () {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(parser(fileReader.result, mapper))
    );
    element.setAttribute("download", `${fileName.current || "example"}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click(); //Execute download
    document.body.removeChild(element);
  };

  useEffect(() => {
    document.getElementById("fileupload").addEventListener(
      "change",
      function (e) {
        var files = e.target.files;
        fileName.current = files[0].name;
        fileReader.readAsText(files[0]);
      },
      false
    );
  }, [fileReader]);

  return (
    <>
      <div>Upload a CSV formatted file:</div>
      <input type="file" id="fileupload" accept=".csv" required />
      <div id="output"></div>
    </>
  );
};
