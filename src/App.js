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
    isP2Uman: true,

    player1name: "",
    player2name: "",
    player1symbol: "",

    isP1turn: null,
    isGameOver: false,

    canP1play: true,

    p1Score: 0,
    p2Score: 0,

    victoryLine: null,

    gameHistory: [],

    hamMenu: false,
  }

  moveHandler = (cellIndex) => {
    const isP2Uman = this.state.isP2Uman;
    if (this.state.isGameOver || !this.state.canP1play) {
      return null;
    }

    let p1Symbol = this.state.player1symbol;
    let p2Symbol = this.state.player1symbol === "X" ? "O" : "X";

    let move = this.state.isP1turn ? p1Symbol : p2Symbol;

    let newCells = [...this.state.cells];

    if (newCells[cellIndex] === "") {
      newCells[cellIndex] = move;
    }
    this.victoryHandler(newCells);
    this.setState({
      cells: newCells,
      isP1turn: !(this.state.isP1turn),
    });
    if (!isP2Uman) {
      this.setState({
        canP1play: false
      });
    }
  }

  pcMoveHandler = () => {
    let p2Symbol = this.state.player1symbol === "X" ? "O" : "X";

    if (this.state.isGameOver || this.state.isP1turn) {
      return null;
    }
    let board = [...this.state.cells];

    const makeRandomMove = (board) => {
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      let cellIndex = null;
      while (cellIndex === null) {
        let rand = getRandomIntInclusive(0, 8);
        if (board[rand] === "") {
          cellIndex = rand;
        }
      }

      board[cellIndex] = p2Symbol;
      return board;
    }

    const findForcedMove = (board) => {

      let lines = {
        line012: [board[0], board[1], board[2]],
        line345: [board[3], board[4], board[5]],
        line678: [board[6], board[7], board[8]],
        line036: [board[0], board[3], board[6]],
        line147: [board[1], board[4], board[7]],
        line258: [board[2], board[5], board[8]],
        line048: [board[0], board[4], board[8]],
        line642: [board[6], board[4], board[2]],
      };

      let weakLines = [];

      for (let line in lines) {

        let xCount = 0;
        let oCount = 0;
        let blankCount = 0;

        lines[line].forEach((cell, i) => {
            if (cell === "X") {
            xCount++;
          } else if (cell === "O") {
            oCount++;
          } else {
            blankCount++;
          }
        });

        if ((xCount === 2 || oCount === 2) && blankCount === 1) {
          weakLines.push(line);
        }
      }

      // console.log("weaklines", weakLines);
      // dare la priorità alla linea vincente o in alternativa bloccare l'avversario
      let winnerLine = null;
      let blockLine = null;
      weakLines.forEach((line, i) => {
        // console.log(lines[line][0]);
        if (lines[line][0] === p2Symbol) {
          winnerLine = line;
        } else {
          blockLine = line;
        }
      });

      let winnerCell = null;
      let blockCell = null;

      if (winnerLine !== null) {
        let cellNumbers = winnerLine.substring(4);
        lines[winnerLine].forEach((cell, i) => {
          if (cell === "") {
            winnerCell = cellNumbers[i];
          }
        });
      }

      if (blockLine !== null) {
        let cellNumbers = blockLine.substring(4);
        lines[blockLine].forEach((cell, i) => {
          if (cell === "") {
            blockCell = cellNumbers[i];
          }
        });
      }

      // console.log("winner", winnerCell);
      // console.log("block", blockCell);
      // console.log("------------------");

      return ({
        winnerCell: winnerCell,
        blockCell: blockCell
      });
    }

    const makeDoubleAttack = (board) => {
      let lines = {
        line012: [board[0], board[1], board[2]],
        line345: [board[3], board[4], board[5]],
        line678: [board[6], board[7], board[8]],
        line036: [board[0], board[3], board[6]],
        line147: [board[1], board[4], board[7]],
        line258: [board[2], board[5], board[8]],
        line048: [board[0], board[4], board[8]],
        line642: [board[6], board[4], board[2]],
      };

      let freeLines = [];

      for (let line in lines) {

        let pcSymbolCount = 0;
        let umanSymbolCount = 0;
        lines[line].forEach((cell, i) => {
          if (cell === p2Symbol) {
            pcSymbolCount++;
          } else if (cell === this.state.player1symbol) {
            umanSymbolCount++;
          }
        });

        if (pcSymbolCount === 1 && umanSymbolCount === 0) {
          freeLines.push(line);
        }
      }

      freeLines.forEach((line, i) => {
        freeLines[i] = line.substring(4);
      });

      let cellState = {};
      // inserisce solo le key vuote
      freeLines.forEach((line, i) => {
        cellState[line[0]] = 0;
        cellState[line[1]] = 0;
        cellState[line[2]] = 0;
      });

      // conta le celle libere (alcune saranno in comune)
      freeLines.forEach((line, i) => {
        if (board[line[0]] === "") {
          cellState[line[0]]++;
        }
        if (board[line[1]] === "") {
          cellState[line[1]]++;
        }
        if (board[line[2]] === "") {
          cellState[line[2]]++;
        }
      });

      let doubleAttack = null;
      for (let cell in cellState) {
        if (cellState[cell] === 2) {
          doubleAttack = cell;
        }
      }

      if (doubleAttack) {
        return parseInt(doubleAttack);
      } else {
        return null;
      }
    }

    const doubleLine = (board) => {
      let lines = {
        line012: [board[0], board[1], board[2]],
        line345: [board[3], board[4], board[5]],
        line678: [board[6], board[7], board[8]],
        line036: [board[0], board[3], board[6]],
        line147: [board[1], board[4], board[7]],
        line258: [board[2], board[5], board[8]],
        line048: [board[0], board[4], board[8]],
        line642: [board[6], board[4], board[2]],
      };

      let freeLines = [];

      for (let line in lines) {

        let pcSymbolCount = 0;
        let umanSymbolCount = 0;
        lines[line].forEach((cell, i) => {
          if (cell === p2Symbol) {
            pcSymbolCount++;
          } else if (cell === this.state.player1symbol) {
            umanSymbolCount++;
          }
        });

        if (pcSymbolCount === 1 && umanSymbolCount === 0) {
          freeLines.push(line);
        }
      }

      freeLines.forEach((line, i) => {
        freeLines[i] = line.substring(4);
      });

      let cellState = {};
      freeLines.forEach((line, i) => {
        cellState[line[0]] = board[[line[0]]];
        cellState[line[1]] = board[[line[1]]];
        cellState[line[2]] = board[[line[2]]];
      });

      // console.log(cellState);
      let freeMoves = [];
      for (let cell in cellState) {
        if (cellState[cell] === "") {
          freeMoves.push(cell);
        }
      }
      // console.log(freeMoves);

      if (freeMoves.length === 0) {
        return null;
      }

      let trapMove = null;
      freeMoves.forEach((cell, i) => {
        let newBoard = [...board];
        newBoard[parseInt(cell)] = p2Symbol;
        let ifDouble = makeDoubleAttack(newBoard);
        if (ifDouble) {
          trapMove = ifDouble;
        }
      });

      if (trapMove) {
        return parseInt(trapMove);
      } else {
        // prende la prima mossa libera in mancanza di combinazione forzata
        return freeMoves[0];
      }
    }

    let forcedMove = findForcedMove(board);

    if (forcedMove.winnerCell !== null) {
      board[forcedMove.winnerCell] = p2Symbol;
    } else if (forcedMove.blockCell !== null) {
      board[forcedMove.blockCell] = p2Symbol;
    } else if (makeDoubleAttack(board) !== null) {
      let doubleAttackResult = makeDoubleAttack(board);
      board[doubleAttackResult] = p2Symbol;
      console.log("Fregato", doubleAttackResult);
    } else if (doubleLine(board) !== null) {
      board[doubleLine(board)] = p2Symbol;
    } else {
      board = makeRandomMove(board);
    }

    this.victoryHandler(board);
    this.setState({
      cells: board,
      isP1turn: !(this.state.isP1turn),
      canP1play: true
    });
  }

  historyHandler = (ActualCells)=> {
    let oldHistory = [...this.state.gameHistory];
    let newHistory = [...oldHistory, ActualCells];
    this.setState({
      gameHistory: newHistory,
    });
  }

  drawHandler = (ActualCells) => {
    // console.log("draw");
    this.setState({
      isGameOver: true,
    });
    this.historyHandler(ActualCells);
    this.resetGameHandler();
  }

  victoryHandler = (cells) => {
    let board = cells;

    let victoryto = (line) => {
      this.setState({
        isGameOver: true,
        victoryLine: line,
      });

      if (this.state.isP1turn) {
        // console.log("P1 wins");
        let newScore = this.state.p1Score;
        newScore++;
        this.setState({
          p1Score: newScore
        });
      } else {
        // console.log("P2 wins");
        let newScore = this.state.p2Score;
        newScore++;
        this.setState({
          p2Score: newScore
        });
      }
      this.historyHandler(cells);
      this.resetGameHandler();
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
          this.drawHandler(cells);
        }
  }

  resetGameHandler = () => {
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
    }, 2500);
  }

  startGameHandler = (gameSetting) => {
    this.setState({
      choosePlayer: false,
      player1name: gameSetting.player1name,
      player2name: gameSetting.player2name,
      player1symbol: gameSetting.player1symbol,
      isP2Uman: gameSetting.isP2Uman,
    });
  }

  showHamHandler = () => {
    this.setState({
      hamMenu: true,
    });
  }

  hideHamHandler = () => {
    this.setState({
      hamMenu: false,
    });
  }

  componentDidMount() {
    this.setState({
      isP1turn: Math.random() < 0.5
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
   return prevState;
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isP2Uman && !this.state.isP1turn && !this.state.isGameOver && !this.state.choosePlayer) {
      setTimeout(() => {
        this.pcMoveHandler();
      }, 800);
    }
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
        <Layout hamMenu={this.state.hamMenu} showHamHandler={this.showHamHandler} hideHamHandler={this.hideHamHandler} gameHistory={this.state.gameHistory} victoryLine={this.state.victoryLine}>
          <div className="displayGameInfo">
            <h1>
              {turnInfo}
            </h1>
            <VictoriesCounter p1Score={this.state.p1Score} p2Score={this.state.p2Score} player1name={this.state.player1name} player2name={this.state.player2name} />
          </div>
          <GameGrill cells={this.state.cells} moveHandler={this.moveHandler} isGameOver={this.state.isGameOver} victoryLine={this.state.victoryLine} canP1play={this.state.canP1play} />
        </Layout>
      </div>
    );
  }
}

export default App;
