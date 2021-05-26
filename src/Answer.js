//import React, { Component, useState } from "react";
function Answer(props) {
  return <div><button className="optionBtn" onClick={props.handleClick}>{props.choice}</button></div>;
}

export default Answer;