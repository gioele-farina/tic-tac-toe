import React from 'react';
import './GameCell.css';

const gameCell = (props) => {

  let classes = "gameCell";
  if (props.content === "" ) {
    classes = "gameCell active";
  }

  return (
    <div className={classes} onClick={() => props.moveHandler(props.index)}>{props.content}</div>
  );
}

export default gameCell;
