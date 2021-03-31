import React from 'react';
import './GameGrill.css';
import GameDesign from '../GameDesign/GameDesign';
import GameCell from './GameCell/GameCell';

const gameGrill = (props) => {

  let cells = props.cells.map((cell, i) => {
    return <GameCell key={i} content={cell} />
  });

  return (

    <div className="GameGrill">
      {cells}

      <GameDesign />
    </div>
  )
}

export default gameGrill;
