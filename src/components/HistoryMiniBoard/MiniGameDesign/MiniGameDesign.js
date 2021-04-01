import React from 'react';
import './MiniGameDesign.css';
import Wrapper from '../../Wrapper/Wrapper';

const miniGameDesign = () => {

  return (
    <Wrapper>
      <div className="miniGrillLine miniVertical v1"></div>
      <div className="miniGrillLine miniVertical v2"></div>
      <div className="miniGrillLine miniHorizontal hr1"></div>
      <div className="miniGrillLine miniHorizontal hr2"></div>
    </Wrapper>
  )
}

export default miniGameDesign;
