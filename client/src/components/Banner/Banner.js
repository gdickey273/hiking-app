import React from "react";
import './Banner.css';

function Banner(){
  return (
    <div className="banner">
      <h3>Find Trails:</h3>
      <input type="text" className="trail-search" placeholder="Enter a location or keyword" />
    </div>
  )
};

export default Banner;
