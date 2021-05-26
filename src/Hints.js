//import React, {useState} from "react";

function Hints(props) {
  var hintOne = props.data.prompt.title;
  var answers = props.data.options;
  var wrongAnswers = answers.filter(obj => obj.name !== props.data.prompt.name);

  var hintTwo = props.wrongName;
  var hintTwoIndex = wrongAnswers.findIndex(x => x.name === hintTwo)
  var hintThree = wrongAnswers[hintTwoIndex+1] ? wrongAnswers[hintTwoIndex+1].name : wrongAnswers[hintTwoIndex-1].name;

  return <div className="hints">
    <h5>Hints</h5>
    <div>
      {props.hint > 0 ? <p>- This character is from {hintOne}</p> : null}
      {props.hint >= 2 ? <p>- {hintTwo} is NOT the answer</p> : null}
      {props.hint === 3 ? <p>- {hintThree} is NOT the answer</p> : null}
      {props.hint < 3 ? <button onClick={() => showHint()}>Click to get a hint, {props.hint === 2 ? `-2` : `-${props.hint+1}`} seconds</button> : null}
      <p className="blue">Attainable time = {props.attainableTime} seconds</p>
    </div>
    <br/>
  </div>;

  function showHint() {
    props.setHint(props.hint);
    if (props.wrongName === "John Doe" && props.hint === 1) {
      props.setWrongName(wrongAnswers);
    }
  }
}

export default Hints;