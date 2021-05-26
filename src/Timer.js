import React, { useEffect } from "react";

function Time(props) {
  //var unformatted = props.time > 0 ? props.time : 0;
  //var [rawTime, setRawTime] = useState(unformatted);

  //var [seconds, setSeconds] = useState(secondsUnformat);
  //var [minutes, setMinutes] = useState(minutesUnformat);


  function updateTime() {
    if (props.currentTime <= 0) {
      //change round
      props.changeRound(props.round === "First" ? "Intermission" : "End");
      //setSeconds(0);
      //setMinutes(4);
    } else {
      props.setCurrentTime(props.currentTime-1);
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
  getDisplay(props.currentTime);
  return <div>{display}</div>;
}

export default Time;
