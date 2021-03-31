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
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">

        <h1>Titolo momentaneo</h1>
        <GameGrill cells={this.state.cells}/>
      </div>
    );
  }
}

export default App;
