import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    <div className="list-results-container">
      <ul className="list-results-group">
        {children}
      </ul>
    </div>
  );
};
