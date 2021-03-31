import React from 'react';
import "./VictoryLine.css";
import Wrapper from '../Wrapper/Wrapper';

const victoryLine = (props) => {

  let line = props.victoryLine;
  let diplayedLine = null;

  switch (line)
  {
    case "012":
      diplayedLine = <div className="victoryLine line012"></div>;
      break;

    case "345":
      diplayedLine = <div className="victoryLine line345"></div>;
      break;

    case "678":
      diplayedLine = <div className="victoryLine line678"></div>;
      break;

    case "036":
      diplayedLine = <div className="victoryLine line036"></div>;
      break;

    case "147":
      diplayedLine = <div className="victoryLine line147"></div>;
      break;

    case "258":
      diplayedLine = <div className="victoryLine line258"></div>;
      break;

    case "048":
      diplayedLine = <div className="victoryLine line048"></div>;
      break;

    case "642":
      diplayedLine = <div className="victoryLine line642"></div>;
      break;

    default:
      diplayedLine = null;
      break;
  }

  return (
    <Wrapper>
      {diplayedLine}
    </Wrapper>
  )
}

export default victoryLine;

//lines
// 012
// 345
// 678
// 036
// 147
// 258
// 048
// 642
