import React, { useState, useEffect, useRef} from "react";
import CreateRouteMap from "../CreateRouteMap";
import extAPI from "../../utils/extAPI";
import API from "../../utils/API";
function CreateRouteMarkers(props) {
  const { newTrailObj, setNewTrailObj, centerCoords, setCenterCoords, formStage, setFormStage } = props;
  const [currentMarker, setCurrentMarker] = useState("");
  
  const handleRemoveWaypoint = (event) => {
    event.preventDefault();
    let arr = newTrailObj.waypoints;
    arr.splice(event.target.dataset.index, 1);
    setNewTrailObj({ ...newTrailObj, waypoints: arr });
  }

  function handleWaypointToggleClick(event) {
    event.preventDefault(); 
    // console.log(waypointButton.current);
    // waypointButton.current.focus();
    if (currentMarker === "waypoint") {
      setCurrentMarker(null);
    } else {
      setCurrentMarker(`waypoint`); 
    }
    
  }
  let submitReady = false;
  if (newTrailObj.trailType === "aToB") {
    if (newTrailObj.origin && newTrailObj.waypoints.length > 0 && newTrailObj.destination) {
      submitReady = true;
    }
  } else if (newTrailObj.origin && newTrailObj.waypoints.length > 0) {
    submitReady = true;
  } 

  return (
    <>
      <button name="setOrigin" onClick={event => { event.preventDefault(); setCurrentMarker("Origin") }}>Set Origin</button>
      <label for="setOrigin">Origin: {newTrailObj.origin && `Lat: ${newTrailObj.origin.lat()}, Lng: ${newTrailObj.origin.lng()}`}</label><br />

      {newTrailObj.trailType === "aToB"
        ?
        <>
          <button name="setDestination" onClick={event => { event.preventDefault(); setCurrentMarker("Destination") }}>Set Destination</button>
          <label for="setDestination">Destination: {newTrailObj.destination && `Lat: ${newTrailObj.destination.lat()}, Lng: ${newTrailObj.destination.lng()}`}</label><br />
        </>
        :
        newTrailObj.origin &&
        <>
          {/* <label for="setDestination">Destination: {`Lat: ${newTrailObj.origin.lat()}, Lng: ${newTrailObj.origin.lng()}`}</label><br /> */}
        </>
      }
    


      <div className="trail-maker-waypoints">
      <button onClick={handleWaypointToggleClick} >{currentMarker === "waypoint" ? "Stop Setting Waypoints" : "Set Waypoints"}</button><br />
        {newTrailObj.waypoints.map((wp, i) => (
          <>
            {/* <button for={`setWaypoint${i + 1}`} onClick={event => { event.preventDefault(); setCurrentMarker(`Waypoint${i + 1}`) }}>Set Waypoint</button> */}
            <label for="setOrigin">Waypoint #{i + 1}: {`Lat: ${wp.lat()}, Lng: ${wp.lng()}`}</label><br />
            <button data-index={i} onClick={handleRemoveWaypoint}>x</button><br />
          </>
        ))}
      {submitReady && 
        <button onClick={event => {event.preventDefault(); setFormStage("info")}}>Confirm Trail Path</button>
      }  
      
      </div>

      <CreateRouteMap className="map-container" centerCoords={centerCoords} newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} currentMarker={currentMarker} setCurrentMarker={setCurrentMarker} />

    </>);
}

export default CreateRouteMarkers;