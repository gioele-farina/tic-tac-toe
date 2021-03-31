import React from 'react';
import './GameCell.css';

const gameCell = (props) => {

  return (
    <div className="gameCell">{props.content}</div>
  );
}

export default gameCell;
