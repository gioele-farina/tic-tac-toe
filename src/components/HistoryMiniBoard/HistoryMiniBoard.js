import React, {Component} from 'react';
import './HistoryMiniBoard.css';
import MiniGameDesign from './MiniGameDesign/MiniGameDesign';
import MiniGameCell from './MiniGameCell/MiniGameCell';
import VictoryLine from '../VictoryLine/VictoryLine';

class HistoryMiniBoard extends Component {

  state = {
    line: this.props.victoryLine
  }

  shoulComponentUpdate() {
	  return false;
  }

  render(){
    let cells = this.props.game.map((cell, i) => {
      return <MiniGameCell key={i} content={cell} />;
    });

    return (
      <div className="historyMiniBoard">
        {cells}
        <MiniGameDesign />
        <VictoryLine victoryLine={this.state.line}/>
      </div>
    );
  }
}

export default HistoryMiniBoard;
