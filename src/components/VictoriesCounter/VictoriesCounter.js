import React from 'react';
import './VictoriesCounter.css'

const victoriesCounter = (props) => {

  return (
    <div className="victoriesCounterContainer">
      <p className="playersScore">{props.player1name}: {props.p1Score} - {props.player2name}: {props.p2Score}</p>
    </div>
  );
}

export default victoriesCounter;
