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
      {/* <Switch>
              <Route exact path="/" component={Trails} />
              <Route exact path="/trails" component={Trails} />
              <Route exact path="/trails/:id" component={Detail} />
              <Route component={NoMatch} />
      </Switch> */}
      <Trails renderTrailById={props.renderTrailById}/>
    </div>
  )
};

export default Banner;
