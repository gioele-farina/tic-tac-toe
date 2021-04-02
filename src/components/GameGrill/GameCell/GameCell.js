import React from 'react';
import './GameCell.css';

const gameCell = (props) => {

  let classes = "gameCell";
  if (props.content === "" ) {
    classes = "gameCell active";
  }
  if (props.isGameOver || !props.canP1play) {
    classes = "gameCell";
  }

  return (
    <div className={classes} onClick={() => props.moveHandler(props.index)}>{props.content}</div>
  );
}

export default gameCell;
