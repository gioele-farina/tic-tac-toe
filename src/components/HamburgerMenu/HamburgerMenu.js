import React from 'react';
import './HamburgerMenu.css';
import Wrapper from '../Wrapper/Wrapper';
import HistoryMiniBoard from '../HistoryMiniBoard/HistoryMiniBoard';

const hamburgerMenu = (props) => {

  let showClass = props.show ? "hamShow show" : "hamShow";
  let history = [];
  if (props.gameHistory.length > 0) {
    props.gameHistory.forEach((game, i) => {
      history.push(<HistoryMiniBoard key={i} game={game}/>);
    });
  }

  return (
    <Wrapper>
      <div className="hamContainer" onClick={props.showHamHandler}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={showClass}>
        <div className="closeButton" onClick={props.hideHamHandler}><i className="far fa-times-circle"></i></div>
        <h1 className="historyTitle">Game History</h1>
        <main className="historyBoard">
          {history}
        </main>
      </div>
    </Wrapper>
  );
}

export default hamburgerMenu;
