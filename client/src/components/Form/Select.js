import React from "react";

export const Select = props => (
  <div className="form-group">
    <select {...props} className="form-control">
      {props.children}
    </select>
  </div>
);