import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="search-trail-submit">
    {props.children}
  </button>
);
