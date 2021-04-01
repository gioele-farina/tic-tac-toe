import React from 'react';
import './MiniGameCell.css';

const miniGameCell = (props) => {

  return (
    <div className="miniGameCell">{props.content}</div>
  );
}

export default miniGameCell;
