//import React, { Component, useState } from "react";
import Answer from "./Answer.js";

function Prompt(props) {
  return (
    <div>
      <h3>Guess the Character</h3>
      <img src={props.image} className="image" height={350} alt="character" />
      { props.finalAnswer !== "unanswered" ? null :
        <div className="answers">
          {props.answers?.map((answer) => {
            return (
              <Answer
                choice={answer.name}
                handleClick={() => {
                  props.setState(answer.name);
                }}
                key={answer.name + Math.floor(Math.random()*1000)}
              />
            );
          })}
        </div>
      }

    </div>
  );
}

export default Prompt;
