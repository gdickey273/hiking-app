import React from "react";
import './Info.css';
import TrailsWeather from '../TrailsWeather';
import Streetview from '../Streetview';
import Forecast from '../ForecastCard'; 

function Info(props){
  return (
   <div className="module-select">

     <div className="module-toggle">
       <div className="module-toggle-containers toggle-top"><i className="fas fa-street-view"></i></div>
       <div className="module-toggle-containers toggle-mid-top"><i className="fas fa-cloud-sun-rain"></i></div>
       <div className="module-toggle-containers toggle-mid-bottom"><i className="fas fa-images"></i></div>
       <div className="module-toggle-containers toggle-bottom"><i className="fas fa-comments"></i></div>
     </div>
    {props.trailId?.length > 0 && <Streetview trailId={props.trailId}/>}
    {props.trailId?.length > 0 && <Forecast trailId={props.trailId}/>}
    
   </div>
  )
};

export default Info;
