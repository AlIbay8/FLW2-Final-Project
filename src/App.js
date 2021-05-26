import React, {useState, useEffect } from "react";
import FirstRound from "./FirstRound";
import "./styles.css";
import { getManyCharacters } from "./getManyCharacters.js";
export default function App() {
  var [retrievedData, setRetrievedData] = useState([]);
  var [startGame, setStartGame] = useState(false);
  var question = {
    prompt: {
      image: "",
      name: "",
      title: ""
    },
    options: []
  };

  useEffect(() => {
    getManyCharacters(setRetrievedData);
  }, []);

  return (
    <div className="App">
      <h1>AniGuesser</h1>
      {startGame ? null : <button onClick={() => setStartGame(true)}>Start Game</button>}
      {startGame ? retrievedData.length === 250 && (
        <FirstRound characterArray={retrievedData} question={question} />
      ) : null}
      <div></div>
    </div>
  );
}
