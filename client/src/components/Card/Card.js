import React from "react";

export const Card = (props) => (
  <div className="card mt-5">
    <img class="card-img-top" src={props.photos} alt="Card image cap"></img>
    <div className="card-header bg-secondary">
      <h5>{props.name}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
