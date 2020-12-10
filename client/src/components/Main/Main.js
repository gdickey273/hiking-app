import React from "react";
import './Main.css';
import CreateRouteForm from '../CreateRouteForm';
import Detail from '../Detail';

function Main(props) {
  return props.trailId?.length > 0 ? (
    <main>
      <Detail trailId={props.trailId} loggedIn={props.loggedIn} setFavsUpdated={props.setFavsUpdated} user={props.user}/>      
      <CreateRouteForm loggedIn={props.loggedIn} setTrailId={props.setTrailId} trailId={props.trailId} user={props.user}/>
    </main>
  )
  :
  (
    <main>     
      <CreateRouteForm loggedIn={props.loggedIn} setTrailId={props.setTrailId} trailId={props.trailId} user={props.user}/>
    </main>
  )
};

export default Main;
