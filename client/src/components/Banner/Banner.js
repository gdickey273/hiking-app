import React from "react";
import './Banner.css';
import Trails from '../Trails';
// import Detail from "../../pages/Detail";
// import NoMatch from "../../pages/NoMatch";
// import { Route, Switch } from 'react-router-dom';

function Banner(props){
  return (
    <div className="banner">
      <h3>Find Trails:</h3>
      <Trails renderTrailById={props.renderTrailById}/>
    </div>
  )
};

export default Banner;
