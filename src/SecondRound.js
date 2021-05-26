import React, { useState } from "react";
import FavoritesOption from "./FavoritesOption.js";
import SecondRoundTimer from "./SecondRoundTimer.js";
function SecondRound(props) {
  //props = characters, score, time, round
  let [questionNumber, setQuestionNumber] = useState(0);
  let [answerChoice, setAnswerChoice] = useState("unanswered");
  var [secondRoundTime] = useState(props.time);
  var [round, setRound] = useState(props.round);
  var [score, setScore] = useState(0);
  var [scoreGained, setScoreGained] = useState(0);

  function newFavoritesPrompt() {
    var characters = props.characters;

    props.question[0] =
      characters[Math.floor(Math.random() * characters.length)];
    props.question[1] =
      characters[Math.floor(Math.random() * characters.length)];
  }

  if (props.question[0] === undefined) {
    newFavoritesPrompt();
  }

  if (answerChoice !== "unanswered") {
    console.log(answerChoice);
    var compare =
      answerChoice === props.question[0]
        ? props.question[1]
        : props.question[0];

    var favsOne = props.question[0].favorites;
    var favsTwo = props.question[1].favorites;

    var highestFavs = favsOne >= favsTwo ? favsOne : favsTwo;
    var lowestFavs = favsOne === highestFavs ? favsTwo : favsOne;

    var percentage = Math.floor((lowestFavs / (highestFavs + 1)) * 100) + 1;
    console.log(favsOne, favsTwo, percentage);

    if (answerChoice.favorites > compare.favorites) {
      setScore(score + percentage);
      setScoreGained(percentage);
      setAnswerChoice("unanswered");
      nextQuestion();
    } else {
      setScoreGained(-percentage);
      setScore(score - Math.floor(percentage / 2));
      setAnswerChoice("unanswered");
      nextQuestion();
    }
  }

  return (
    <div>
      {round === "Second" ? (
        <div>
          <SecondRoundTimer
            time={secondRoundTime}
            round={props.round}
            changeRound={(round) => setRound(round)}
          />
          <p>Score: {score}</p>
          <b>
            {scoreGained > 0 ? (
              <p className="green">+{scoreGained}</p>
            ) : (
              <p className="red">{Math.floor(scoreGained / 2)}</p>
            )}
          </b>
          <p>Which character is more popular?</p>
          <div className="favoritesAnswers">
            {props.question?.map((answer) => {
              return (
                <FavoritesOption
                  choice={answer}
                  handleClick={() => {
                    setAnswerChoice(answer);
                  }}
                  key={answer.name + Math.floor(Math.random() * 1000)}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {round === "End" ? (
        <div>
          <h2>Game Over!</h2>
          <h3>Final score: {score}</h3>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Play again?
          </button>
        </div>
      ) : null}
    </div>
  );

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
    setAnswerChoice("unanswered");
    newFavoritesPrompt();
  }
}

export default SecondRound;
