import React, { useState } from "react";
import CreateRouteMap from "../CreateRouteMap";

function CreateRouteMarkers(props) {
  const { newTrailObj, setNewTrailObj, centerCoords, setCenterCoords, formStage, setFormStage } = props;
  const [currentMarker, setCurrentMarker] = useState("");
  const waypointNameString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  
  const handleRemoveWaypoint = (event) => {
    event.preventDefault();
    let arr = newTrailObj.waypoints;
    arr.splice(event.target.dataset.index, 1);
    setNewTrailObj({ ...newTrailObj, waypoints: arr });
  }

  function handleWaypointToggleClick(event) {
    event.preventDefault(); 
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
        <></>
      }
    


      <div className="trail-maker-waypoints">
      <button onClick={handleWaypointToggleClick} >{currentMarker === "waypoint" ? "Stop Setting Waypoints" : "Set Waypoints"}</button><br />
        {newTrailObj.waypoints.map((wp, i) => (
          <>
            <label for="setOrigin" key={"label-" + i}>Waypoint {waypointNameString[i]}: {`Lat: ${wp.lat()}, Lng: ${wp.lng()}`}</label><br />
            <button data-index={i} onClick={handleRemoveWaypoint} key={"remove-" + i}>x</button><br />
          </>
        ))}
      {submitReady && 
        <button onClick={event => {event.preventDefault(); setFormStage("info");}}>Confirm Trail Path</button>
      }  
      
      </div>

      <CreateRouteMap className="map-container" centerCoords={centerCoords} newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} currentMarker={currentMarker} setCurrentMarker={setCurrentMarker} />

    </>);
}

export default CreateRouteMarkers;