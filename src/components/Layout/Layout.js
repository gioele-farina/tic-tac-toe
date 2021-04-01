import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './Layout.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const layout = (props) => {

  return (
    <Wrapper>
      <nav className="navbar">
        <h1>Play Tic-Tac-Toe!</h1>
        <HamburgerMenu show={props.hamMenu} showHamHandler={props.showHamHandler} hideHamHandler={props.hideHamHandler} gameHistory={props.gameHistory} />
      </nav>
      <main className="appPage">{props.children}</main>
    </Wrapper>
  )
}

export default layout;
