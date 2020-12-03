import React from "react";
import './Info.css';
import TrailsWeather from '../TrailsWeather';
import Streetview from '../Streetview';
import Comments from '../Comments';
import Forecast from '../ForecastCard';
import Slider from './Slider';


function Info(props){

// var flkty = new Flickity('.carousel');
// var buttonGroup = document.querySelector('.button-group');
// buttonGroup.addEventListener( 'click', function( event ) {
//   if ( !matchesSelector( event.target, '.button' ) ) {
//     return;
//   }
//   var selector = event.target.getAttribute('data-selector');
//   flkty.selectCell( selector );
// });

  return (
   <div className="module-select">
    <div className="carousel" data-flickity='{ "cellAlign": "left", "contain": true, "percentPosition": false }'>
    <div className="carousel-cell cell1"><Comments /></div>
      <div className="carousel-cell cell2"><Forecast /></div>
      <div className="carousel-cell cell3">{props.trailId?.length > 0 && <Streetview trailId={props.trailId}/>}</div>
    </div>

     <div className="module-toggle button-group">
       <div className="module-toggle-containers toggle-top button" data-selector=".cell4"><i className="fas fa-comments"></i></div>
       <div className="module-toggle-containers toggle-mid-top button" data-selector=".cell2"><i className="fas fa-cloud-sun-rain"></i></div>
       <div className="module-toggle-containers toggle-bottom button" data-selector=".cell1"><i className="fas fa-street-view"></i></div>
     </div>

    {props.trailId?.length > 0 && <Streetview trailId={props.trailId}/>}
    {props.trailId?.length > 0 && <Forecast trailId={props.trailId}/>}
   </div>
  )
};

export default Info;