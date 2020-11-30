import React from "react";

export const Select = props => (
  <div className="form-group">
    <select {...props} className="form-control trail-search-select">
      {props.children}
    </select>
  </div>
);