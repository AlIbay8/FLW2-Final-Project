import React, { useState } from "react";
import Timer from "./Timer.js";
import Prompt from "./Prompt.js";
import Nextquestion from "./Nextquestion.js";
import Hints from "./Hints.js";
import Stats from "./Stats.js"
import SecondRound from "./SecondRound.js";

function FirstRound(props) {
  let [questionNumber, setQuestionNumber] = useState(0);
  let [answerChoice, setAnswerChoice] = useState("unanswered");
  var [hintShown, setHintShown] = useState(0);
  var [timeReward, setTimeReward] = useState(5);
  var [wrongAnswer, setWrongAnswer] = useState("John Doe");
  var [firstRoundTime, setFirstRoundTime] = useState(180);
  var [secondRoundTime, setSecondRoundTime] = useState(0);
  var [round, setRound] = useState("First");
  var [score] = useState(0);
  var secondRoundQuestion = [
  ];

  function newPrompt() {
    var characters = props.characterArray;
    var newCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    //console.log(characters);
    props.question.prompt = {
      name: newCharacter.name,
      image: newCharacter.image,
      title: newCharacter.title,
      favorites: newCharacter.favorites
    };

    var optionsArray = [];
    optionsArray.push(props.question.prompt);
    function getRandomOption(characters) {
      var randomOption =
        characters[Math.floor(Math.random() * characters.length)];

      if (optionsArray.includes(randomOption)) {
        getRandomOption(characters);
        return;
      } else {
        if (randomOption.name !== props.question.prompt.name) {
          //console.log(optionsArray, randomOption);
          optionsArray.push(randomOption);
          return;
        } else {
          getRandomOption(characters);
          return;
        }
      }
    }
    var characterOptions = (characters) => {
      for (var i = 0; i < 3; i++) {
        getRandomOption(characters);
      }
      function shuffle(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
      shuffle(optionsArray);

      return optionsArray;
    };
    props.question.options = characterOptions(characters);
    //console.log(props.question);
  }

  if (props.question.prompt.image === "") {
    nextQuestion();
  }

  if (hintShown === 1 && timeReward !== 4) {
    setTimeReward(4);
  } else if (hintShown === 2 && timeReward !== 5-(hintShown+1)) {
    setTimeReward(2);
  } else if (hintShown === 3 && timeReward !== 0) {
      setTimeReward(0);
  }

  var result = "";
  var correctAnswer = props.question.prompt.name;
  if (answerChoice !== "unanswered") {
    if (answerChoice === correctAnswer) {
      result = <p className="green">Correct, the answer was {correctAnswer}</p>;
    } else {
      result = <p className="red">Wrong, you chose {answerChoice}. The correct answer was {correctAnswer}.</p>;
    }
  } else {
    result = "";
  }
  
  return (
    <div>
      { round === "First" ?
        <div className="firstRound">
          <Timer time={firstRoundTime} setCurrentTime={(rawTime) => setFirstRoundTime(rawTime)} currentTime={firstRoundTime} round={round} changeRound={(round) => setRound(round)}/>
          <div className="questionDiv">
            <Stats secondRoundTime={secondRoundTime} score={score}/>
            <Prompt
              image={props.question.prompt.image}
              answers={props.question.options}
              setState={(choice) => {
                answerRecieved(choice);
              }}
              finalAnswer={answerChoice}
            />
            <Hints hint={hintShown} setHint={(hint) => setHintShown(hint+1)} wrongName={wrongAnswer} setWrongName={(wrongAnswers) => setWrongAnswer(wrongAnswers[Math.floor(Math.random()*wrongAnswers.length)].name)} data={props.question} attainableTime={timeReward} />
          </div>
          {Math.random() > 0.5 ? null : <br/>}
          {Math.random() > 0.3 ? null : <br/>}
          <div>{result}</div>
          {Math.random() > 0.5 ? <br/>: null}
          {Math.random() > 0.2 ? null : <br/>}
          {firstRoundTime <= 0 ? <div><br/><br/><br/></div> : null}
          {answerChoice !== "unanswered" && firstRoundTime >= 0 ? <Nextquestion handleClick={() => nextQuestion()} /> : null}
        </div> : null
      }
      
      { round === "Intermission" ?
        <div className="intermission">
          <h3>Time's up!</h3>
          <p>You have {Math.floor(secondRoundTime / 60)} minutes and {secondRoundTime - Math.floor(secondRoundTime / 60) * 60} seconds for the Second Round!</p>
          <button onClick={() => round === "Intermission" ? setRound("Second") : null}>Proceed to next round</button>
        </div> : null
      }

      {round === "Second" ? <SecondRound characters={props.characterArray} score={score} time={secondRoundTime} round={round} question={secondRoundQuestion}/> : null}
    </div>
  );

  function answerRecieved(choice) {
    setAnswerChoice(choice);
    var correctAnswer = props.question.prompt.name;
    if (choice === correctAnswer) {
      setSecondRoundTime(secondRoundTime+timeReward);
    } else {
      setFirstRoundTime(firstRoundTime-5);
    }
  }

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
    setTimeReward(5);
    setHintShown(0);
    setWrongAnswer("John Doe");
    setAnswerChoice("unanswered");
    newPrompt();
  }
}

export default FirstRound;
