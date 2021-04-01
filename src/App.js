import React, { Component } from 'react';
import './App.css';
import GameGrill from './components/GameGrill/GameGrill';
import Layout from './components/Layout/Layout';
import ChoosePlayer from './containers/ChoosePlayer/ChoosePlayer';
import VictoriesCounter from './components/VictoriesCounter/VictoriesCounter';

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

    player1name: "",
    player2name: "",
    player1symbol: "",

    isP1turn: true,
    isGameOver: false,

    p1Score: 0,
    p2Score: 0,

    victoryLine: null,
  }

  moveHandler = (cellIndex) => {
    if (this.state.isGameOver) {
      return null;
    }

    let p1Symbol = this.state.player1symbol;
    let p2Symbol = this.state.player1symbol === "X" ? "O" : "X";

    let move = this.state.isP1turn ? p1Symbol : p2Symbol;

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

  drawHandler = () => {
    console.log("draw");
    this.setState({
      isGameOver: true,
    });
    setTimeout(() => {
      this.setState({
        cells: [
          "","","",
          "","","",
          "","","",
        ],
        isGameOver: false,
        victoryLine: null,
      });
    }, 3000);
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
        let newScore = this.state.p1Score;
        newScore++;
        this.setState({
          p1Score: newScore
        });
      } else {
        console.log("P2 wins");
        let newScore = this.state.p2Score;
        newScore++;
        this.setState({
          p2Score: newScore
        });
      }

      setTimeout(() => {
        this.setState({
          cells: [
            "","","",
            "","","",
            "","","",
          ],
          isGameOver: false,
          victoryLine: null,
        });
      }, 3000);
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
          this.setState({
            victoryLine: "draw"
          });
          this.drawHandler();
        }
  }

  startGameHandler = (gameSetting) => {

    this.setState({
      choosePlayer: false,
      player1name: gameSetting.player1name,
      player2name: gameSetting.player2name,
      player1symbol: gameSetting.player1symbol,
    });
  }

  componentDidMount() {
    this.setState({
      isP1turn: Math.random() < 0.5
    });
  }

  render() {

    let turnInfo;
    if (!this.state.isGameOver) {
      if (this.state.isP1turn) {
        turnInfo = `${this.state.player1name} (${this.state.player1symbol}) turn`;
      } else {
        turnInfo = `${this.state.player2name} (${this.state.player1symbol === "X" ? "O" : "X"}) turn`;
      }
    } else {
      if (this.state.victoryLine === "draw") {
        turnInfo = "Draw";
      } else {
        turnInfo = this.state.isP1turn ? `${this.state.player2name} wins.` : `${this.state.player1name} wins.`
      }
    }

    return (
      <div className="App">
        <ChoosePlayer start={this.startGameHandler} visible={this.state.choosePlayer} />
        <Layout>
          <div className="displayGameInfo">
            <h1>
              {turnInfo}
            </h1>
            <VictoriesCounter p1Score={this.state.p1Score} p2Score={this.state.p2Score} player1name={this.state.player1name} player2name={this.state.player2name} />
          </div>
          <GameGrill cells={this.state.cells} moveHandler={this.moveHandler} isGameOver={this.state.isGameOver} victoryLine={this.state.victoryLine}/>
        </Layout>
      </div>
    );
  }
}

export default App;
