import React from 'react';
import './GameGrill.css';
import GameDesign from '../GameDesign/GameDesign';
import GameCell from './GameCell/GameCell';
import VictoryLine from '../VictoryLine/VictoryLine';

const gameGrill = (props) => {

  let cells = props.cells.map((cell, i) => {
    return <GameCell key={i} content={cell} index={i} moveHandler={props.moveHandler} isGameOver={props.isGameOver}/>
  });

  return (

    <div className="GameGrill">
      {cells}

      <GameDesign />
      <VictoryLine victoryLine={props.victoryLine}/>
    </div>
  )
}

export default gameGrill;
