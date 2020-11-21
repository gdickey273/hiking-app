import React from "react";
import './Info.css';
import TrailsWeather from '../TrailsWeather';

function Info(){
  return (
   <div className="module-select">

     <div className="module-toggle">
       <div className="module-toggle-containers toggle-top"><i className="fas fa-street-view"></i></div>
       <div className="module-toggle-containers toggle-mid-top"><i className="fas fa-cloud-sun-rain"></i></div>
       <div className="module-toggle-containers toggle-mid-bottom"><i className="fas fa-images"></i></div>
       <div className="module-toggle-containers toggle-bottom"><i className="fas fa-comments"></i></div>
     </div>
   </div>
  )
};

export default Info;
