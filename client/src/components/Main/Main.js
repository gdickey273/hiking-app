import React from "react";
import './Main.css';
import CreateRouteForm from '../CreateRouteForm';
import Detail from '../Detail';

function Main(props) {
  return props.trailId?.length > 0 ? (
    <main>
      <Detail trailId={props.trailId} loggedIn={props.loggedIn}/>      
      <CreateRouteForm loggedIn={props.loggedIn}/>
    </main>
  )
  :
  (
    <main>     
      <CreateRouteForm loggedIn={props.loggedIn}/>
    </main>
  )
};

export default Main;
