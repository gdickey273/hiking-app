import { use } from "passport";
import React, { useState } from "react";
import CreateRouteMap from "../CreateRouteMap";

const CreateRouteForm = (prop) => {

  const [newTrailObj, setNewTrailObj] = useState({ waypoints: [] });
  const [currentMarker, setCurrentMarker] = useState("");

  const handleTypeClick = (event) => {
    setNewTrailObj({ ...newTrailObj, trailType: event.target.value });
    console.log(event.target.value);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTrailObj({ ...newTrailObj, [name]: value });
  }
  return (
    <div>

      <form>
        <div onClick={handleTypeClick}>
          <input type="radio" name="trailType" value="loop" />
          <label for="male">Loop</label><br />
          <input type="radio" id="female" name="trailType" value="outAndBack" />
          <label for="female">Out 'n Back</label><br />
          <input type="radio" id="other" name="trailType" value="aToB" />
          <label for="other">A to B</label>
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" name="city" onChange={handleInputChange} /><br />
          <label for="state">State:</label>
          <input type="text" name="state" onChange={handleInputChange} /><br />
        </div>
        <div>
          <button name="setOrigin" onClick={event => { event.preventDefault(); setCurrentMarker("Origin") }}>Set Origin</button>
          <label for="setOrigin">Origin: {newTrailObj.origin && `Lat: ${newTrailObj.origin.lat()}, Lng: ${newTrailObj.origin.lng()}`}</label><br />

          {newTrailObj.waypoints.map((wp, i) => (
            <>
              <button for={`setWaypoint${i + 1}`} onClick={event => { event.preventDefault(); setCurrentMarker(`Waypoint${i + 1}`) }}>Set Waypoint</button>
              <label for="setOrigin">Waypoint #{i + 1}: {`Lat: ${wp.lat()}, Lng: ${wp.lng()}`}</label><br />
            </>
          ))}

          <button onClick={event => { event.preventDefault(); setCurrentMarker(`Waypoint${newTrailObj.waypoints.length + 1}`) }}>Set {newTrailObj.waypoints.length > 0 ? "Another Waypoint?" : "A Waypoint"}</button><br />

          {newTrailObj.trailType === "aToB"
            ?
            <>
              <button name="setDestination" onClick={event => { event.preventDefault(); setCurrentMarker("Destination") }}>Set Destination</button>
              <label for="setDestination">Destination: {newTrailObj.destination && `Lat: ${newTrailObj.destination.lat()}, Lng: ${newTrailObj.destination.lng()}`}</label><br />
            </>
            :
            newTrailObj.origin &&
            <>
              <label for="setDestination">Destination: {`Lat: ${newTrailObj.origin.lat()}, Lng: ${newTrailObj.origin.lng()}`}</label><br />
            </>
          }

        </div>
      </form>
      <h5>{JSON.stringify(newTrailObj)}</h5>
      <CreateRouteMap newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} currentMarker={currentMarker} />
    </div>


  )
}

export default CreateRouteForm;