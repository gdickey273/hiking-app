import React from "react";
import Streetview from '../Streetview';
import Comments from '../Comments';
import Forecast from '../ForecastCard';

function Info(props) {

  return (
    <div className="module-select">
      <div className="carousel" data-flickity='{ "cellAlign": "left", "contain": true, "percentPosition": false }'>
        <div className="carousel-cell cell1">{props.trailId?.length > 0 && <Comments trailId={props.trailId} loggedIn={props.loggedIn}/>}</div>
        <div className="carousel-cell cell2">{props.trailId?.length > 0 && <Forecast trailId={props.trailId}/>}</div>
        <div className="carousel-cell cell3">{props.trailId?.length > 0 && <Streetview trailId={props.trailId}/>}</div>
      </div>

      <div className="module-toggle button-group">
        <div className="module-toggle-containers toggle-top button" data-selector=".cell4"><i className="fas fa-comments"></i></div>
        <div className="module-toggle-containers toggle-mid-top button" data-selector=".cell2"><i className="fas fa-cloud-sun-rain"></i></div>
        <div className="module-toggle-containers toggle-bottom button" data-selector=".cell1"><i className="fas fa-street-view"></i></div>
      </div>
    </div>
  )
};

export default Info;