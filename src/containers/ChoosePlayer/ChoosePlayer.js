import React, {Component} from 'react';
import './ChoosePlayer.css';

class ChoosePlayer extends Component {

  state = {
    player1name: "",
    player2name: "",

    player1symbol: "",

    notAllowed: false
  }

  changeNameHandler = (event, player) => {
    if (player === "p1") {
      this.setState({
        player1name: event.target.value,
      });
    } else {
      this.setState({
        player2name: event.target.value,
      });
    }
  }

  chooseSymbolHandler = (player, symbol) => {
    if (player === "p1" && symbol === "X") {
      this.setState({
        player1symbol: "X"
      });
    } else if (player === "p1" && symbol === "O") {
      this.setState({
        player1symbol: "O"
      });
    } else if (player === "p2" && symbol === "X") {
      this.setState({
        player1symbol: "O"
      });
    } else if (player === "p2" && symbol === "O") {
      this.setState({
        player1symbol: "X"
      });
    }
  }

  startHandler = () => {
    let isName1insert = this.state.player1name !== "";
    let isName2insert = this.state.player2name !== "";
    let isSymbolChosen = this.state.player1symbol !== "";

    if (isName1insert && isName2insert && isSymbolChosen) {
      this.setState({
        notAllowed : false,
      });
      console.log("start ok");
      this.props.start();
    } else {
      console.log("start non ok");
      this.setState({
        notAllowed : true,
      });
    }
  }

  render(){

    let input1Class;
    let input2Class;

    if (this.state.player1name !== "" && !this.state.notAllowed) {
      input1Class = "inputFilled"
    } else if (this.state.player1name === "" && this.state.notAllowed) {
      input1Class = "danger"
    } else if (this.state.player1name !== "" && this.state.notAllowed) {
      input1Class = "inputFilled"
    }

    if (this.state.player2name !== "" && !this.state.notAllowed) {
      input2Class = "inputFilled"
    } else if (this.state.player2name === "" && this.state.notAllowed) {
      input2Class = "danger"
    } else if (this.state.player2name !== "" && this.state.notAllowed) {
      input2Class = "inputFilled"
    }

    return (
      <div className={this.props.visible ? "choosePlayerContainer" : "choosePlayerContainer closed"}>
        <h1 className="welcomeTitle">Tic-Tac-Toe!</h1>

        <div className="chooseContainer">
          <div className="box1">
            <h2>Player 1</h2>
            <p>Name: </p>
            <input type="text" onChange={(event) => this.changeNameHandler(event, "p1")} value={this.state.player1name}
            className={input1Class}/>

            <p>Choose your symbol</p>

            <div className="chooseSymbol">
              <div className={this.state.player1symbol === "X" ? "inputFilled" : ""} onClick={()=> this.chooseSymbolHandler("p1", "X")}>X</div>
              <div className={this.state.player1symbol === "O" ? "inputFilled" : ""} onClick={()=> this.chooseSymbolHandler("p1", "O")}>O</div>
            </div>
          </div>

          <div className="box2">
            <h2>Player 2</h2>
            <p>Name: </p>
            <input type="text" onChange={(event) => this.changeNameHandler(event, "p2")} value={this.state.player2name} className={input2Class}/>

            <p>Choose your symbol</p>

            <div className="chooseSymbol">
              <div className={this.state.player1symbol === "O" ? "inputFilled" : ""} onClick={()=> this.chooseSymbolHandler("p2", "X")}>X</div>
              <div className={this.state.player1symbol === "X" ? "inputFilled" : ""} onClick={()=> this.chooseSymbolHandler("p2", "O")}>O</div>
            </div>
          </div>
        </div>

        <div className="starButton" onClick={this.startHandler}>
          <h2 className="starText">Start!</h2>
        </div>
      </div>
    )
  }
}

export default ChoosePlayer;
