import React, { Component } from 'react';
import './App.css';
import GameGrill from './components/GameGrill/GameGrill';
import Layout from './components/Layout/Layout';
import ChoosePlayer from './containers/ChoosePlayer/ChoosePlayer';

class App extends Component {

  state = {
    cells: [
      "","","",
      "","","",
      "","","",
    ],

    choosePlayer: true,

    isP1Uman: true,
    isP2Uman: true,

    isP1turn: true,
    isGameOver: false,

    victoryLine: null,
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

  victoryHandler = (cells) => {
    let board = cells;

    let victoryto = (line) => {
      this.setState({
        isGameOver: true,
        victoryLine: line,
      });

      if (this.state.isP1turn) {
        console.log("P1 wins");
      } else {
        console.log("P2 wins");
      }
    }

    if ((board[0] === "X" && board[1] === "X" && board[2] === "X") ||
        (board[0] === "O" && board[1] === "O" && board[2] === "O")) {
          victoryto("012");
    } else if ((board[3] === "X" && board[4] === "X" && board[5] === "X") ||
              (board[3] === "O" && board[4] === "O" && board[5] === "O")) {
          victoryto("345");
    } else if ((board[6] === "X" && board[7] === "X" && board[8] === "X") ||
              (board[6] === "O" && board[7] === "O" && board[8] === "O")) {
          victoryto("678");
    } else if ((board[0] === "X" && board[3] === "X" && board[6] === "X") ||
              (board[0] === "O" && board[3] === "O" && board[6] === "O")) {
          victoryto("036");
    } else if ((board[1] === "X" && board[4] === "X" && board[7] === "X") ||
              (board[1] === "O" && board[4] === "O" && board[7] === "O")) {
          victoryto("147");
    } else if ((board[2] === "X" && board[5] === "X" && board[8] === "X") ||
              (board[2] === "O" && board[5] === "O" && board[8] === "O")) {
          victoryto("258");
    } else if ((board[0] === "X" && board[4] === "X" && board[8] === "X") ||
              (board[0] === "O" && board[4] === "O" && board[8] === "O")) {
          victoryto("048");
    } else if ((board[6] === "X" && board[4] === "X" && board[2] === "X") ||
              (board[6] === "O" && board[4] === "O" && board[2] === "O")) {
          victoryto("642");
    } else
        if (!board.includes("")) {
          console.log("draw");
          this.setState({
            isGameOver: true
          });
    }
  }

  startGameHandler = (gameSetting) => {
    this.setState({
      choosePlayer: false
    });
    console.log("restituire i setting");
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <ChoosePlayer start={this.startGameHandler} visible={this.state.choosePlayer} />
        <Layout>
          <GameGrill cells={this.state.cells} moveHandler={this.moveHandler} isGameOver={this.state.isGameOver} victoryLine={this.state.victoryLine}/>
        </Layout>
      </div>
    );
  }
}

export default App;
