import React from 'react';
import './HistoryMiniBoard.css';
import MiniGameDesign from './MiniGameDesign/MiniGameDesign';
import MiniGameCell from './MiniGameCell/MiniGameCell';

const historyMiniBoard = (props) => {

  let cells = props.game.map((cell, i) => {
    return <MiniGameCell key={i} content={cell} />;
  });

  return (
    <div className="historyMiniBoard">
      {cells}
      <MiniGameDesign />
    </div>
  );
}

export default historyMiniBoard;
