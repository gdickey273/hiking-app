import React from "react";
import './Banner.css';
import Trails from '../../pages/Trails';
import Detail from "../../pages/Detail";
import NoMatch from "../../pages/NoMatch";
import { Route, Switch } from 'react-router-dom';

function Banner(){
  return (
    <div className="banner">
      <h3>Find Trails:</h3>
      <Switch>
              <Route exact path="/" component={Trails} />
              <Route exact path="/trails" component={Trails} />
              <Route exact path="/trails/:id" component={Detail} />
              <Route component={NoMatch} />
      </Switch>
    </div>
  )
};

export default Banner;
