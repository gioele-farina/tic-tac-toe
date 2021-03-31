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
    isGameOver: false,
  }

  moveHandler = (cellIndex) => {
    if (this.state.isGameOver) {
      return null;
    }

    let move = this.state.isP1turn ? "X" : "O";
    let newCells = [...this.state.cells];

    if (newCells[cellIndex] === "") {
      newCells[cellIndex] = move;
    }
    this.setState({
      cells: newCells,
      isP1turn: !(this.state.isP1turn),
    });

    this.victoryHandler(newCells);
  }

  victoryHandler= (cells) => {
    let board = cells;

    let victoryto = () => {
      this.state.isGameOver = true;
      if (this.state.isP1turn) {
        console.log("P1 wins");
      } else {
        console.log("P2 wins");
      }
    }

    if ((board[0] === "X" && board[1] === "X" && board[2] === "X") ||
        (board[0] === "O" && board[1] === "O" && board[2] === "O")) {
          victoryto();
    } else if ((board[3] === "X" && board[4] === "X" && board[5] === "X") ||
              (board[3] === "O" && board[4] === "O" && board[5] === "O")) {
          victoryto();
    } else if ((board[6] === "X" && board[7] === "X" && board[8] === "X") ||
              (board[6] === "O" && board[7] === "O" && board[8] === "O")) {
          victoryto();
    } else if ((board[6] === "X" && board[4] === "X" && board[2] === "X") ||
              (board[6] === "O" && board[4] === "O" && board[2] === "O")) {
          victoryto();
    } else if ((board[0] === "X" && board[3] === "X" && board[6] === "X") ||
              (board[0] === "O" && board[3] === "O" && board[6] === "O")) {
          victoryto();
    } else if ((board[1] === "X" && board[4] === "X" && board[7] === "X") ||
              (board[1] === "O" && board[4] === "O" && board[7] === "O")) {
          victoryto();
    } else if ((board[2] === "X" && board[5] === "X" && board[8] === "X") ||
              (board[2] === "O" && board[5] === "O" && board[8] === "O")) {
          victoryto();
    } else if ((board[0] === "X" && board[4] === "X" && board[8] === "X") ||
              (board[0] === "O" && board[4] === "O" && board[8] === "O")) {
          victoryto();
    }
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
