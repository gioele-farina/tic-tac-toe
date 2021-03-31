import React, { Component } from 'react';
import './App.css';
import GameGrill from './components/GameGrill/GameGrill';

class App extends Component {

  state = {
    cells: [
      "","","",
      "","","",
      "","","",
    ],

    isP1Uman: true,
    isP2Uman: true,

    isP1turn: true,
  }

  moveHandler = (cellIndex) => {
    let move = this.state.isP1turn ? "X" : "O";
    let newCells = [...this.state.cells];

    if (newCells[cellIndex] === "") {
      newCells[cellIndex] = move;
    }
    this.setState({
      cells: newCells,
      isP1turn: !(this.state.isP1turn),
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">

        <h1>Titolo momentaneo</h1>
        <GameGrill cells={this.state.cells} moveHandler={this.moveHandler}/>
      </div>
    );
  }
}

export default App;
