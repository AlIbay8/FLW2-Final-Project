import React, { useState , useEffect } from "react";

function SecondRoundTimer(props) {
  var [timeLeft, setTimeLeft] = useState(props.time)

  function updateTime() {
    if (timeLeft <= 0) {
      props.changeRound("End");
    } else {
      setTimeLeft(timeLeft -1)
    }
  }
  useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
      clearTimeout(token);
    };
  });
  var display;
  function getDisplay(rawTime) {
    var minutesUnformat = Math.floor(rawTime / 60);
    var secondsUnformat = rawTime - minutesUnformat * 60;

    if (secondsUnformat >= 10) {
      display = minutesUnformat + ":" + secondsUnformat;
    } else {
      display = minutesUnformat + ":0" + secondsUnformat;
    }
  }
  getDisplay(timeLeft);
  return <div>{display}</div>
};

export default SecondRoundTimer;