import React from "react";
import './Main.css';
import CreateRouteForm from '../CreateRouteForm';
import Detail from '../Detail';

function Main(props) {
  return props.trailId?.length > 0 ? (
    <main>
      <Detail trailId={props.trailId} />      
      <CreateRouteForm />
    </main>
  )
  :
  (
    <main>     
      <CreateRouteForm />
    </main>
  )
};

export default Main;
