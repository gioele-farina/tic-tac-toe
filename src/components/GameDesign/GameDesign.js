import React from 'react';
import './GameDesign.css';
import Wrapper from '../Wrapper/Wrapper';

const gameDesign = () => {

  return (
    <Wrapper>
      <div className="grillLine vertical v1"></div>
      <div className="grillLine vertical v2"></div>
      <div className="grillLine horizontal hr1"></div>
      <div className="grillLine horizontal hr2"></div>
    </Wrapper>
  )
}

export default gameDesign;
