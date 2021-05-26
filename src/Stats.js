//import React, {useState} from "react";

function Stats(props) {
  var secondRoundTime = props.secondRoundTime > 0 ? props.secondRoundTime : 0;
  var minutes = Math.floor(secondRoundTime / 60);
  var seconds = secondRoundTime - minutes * 60;

  var formatTime = `${minutes > 0 ? minutes : 0}:${seconds > 9 ? seconds : "0" + seconds}`;

  return <div className="stats">
    <h5>Stats</h5>
    <div>
      <p>Score: {props.score}</p>
      <p>Time gained for second round: {formatTime}</p>
    </div>
  </div>;
}

export default Stats;