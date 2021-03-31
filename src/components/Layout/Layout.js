import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './Layout.css';

const layout = (props) => {

  return (
    <Wrapper>
      <nav className="navbar">
        <h1>Play Tic-Tac-Toe!</h1>
      </nav>
      <main className="appPage">{props.children}</main>
    </Wrapper>
  )
}

export default layout;
