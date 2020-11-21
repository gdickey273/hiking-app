import { use } from "passport";
import React, { useState } from "react";
import CreateRouteMap from "../CreateRouteMap";
import extAPI from "../../utils/extAPI";
import API from "../../utils/API";

const CreateRouteForm = (prop) => {

  const [newTrailObj, setNewTrailObj] = useState({ waypoints: [] });
  const [currentMarker, setCurrentMarker] = useState("");
  const [centerCoords, setCenterCoords] = useState({});


  const handleButtonClick = (event) => {
    event.preventDefault();
    const { name } = event.target;

    if (name === "locationSubmit") {
      if(newTrailObj.city && newTrailObj.state){
        console.log("-------------city, state-------------", newTrailObj.city, newTrailObj.state);
        extAPI.getCoordinates(newTrailObj.city, newTrailObj.state)
        .then(res => {
          console.log(res.data);
          setCenterCoords(res.data)});
      }
      
    }

    if(name === "findWithinRadius") {
      API.getTrailsWithinRadius({lat:35.7795897,lng:-78.6381787}, 50)
      .then(res => {
        console.log(res);
      })
     ;
    }
  }
  const handleTypeClick = (event) => {
    setNewTrailObj({ ...newTrailObj, trailType: event.target.value });
    console.log(event.target.value);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTrailObj({ ...newTrailObj, [name]: value });
  }

  const handleRemoveWaypoint = (event) => {
    event.preventDefault();
    let arr = newTrailObj.waypoints;
    arr.splice(event.target.dataset.index, 1);
    setNewTrailObj({ ...newTrailObj, waypoints: arr});
  }
  return (
    <div>

      <form className="map-form">

        <div className="trail-maker">

        <div className="trail-maker-heading">
          <h2>Trail Maker</h2>
          <p>Create a new route to add to your collection</p>
        </div>

        <div className="trail-maker-input" onClick={handleTypeClick}>
          <div>
            <input type="radio" name="trailType" value="loop" />
            <label for="trailType">Loop</label><br />
          </div>
          <div>
            <input type="radio" name="trailType" value="outAndBack" />
            <label for="trailType">Out 'n Back</label><br />
          </div>
          <div>
            <input type="radio"  name="trailType" value="aToB" />
            <label for="other">A to B</label>
          </div>
        </div>

        <div>
          <label for="city">City:</label>
          <input type="text" name="city" onChange={handleInputChange} /><br />
          <label for="state">State:</label>
          <input type="text" name="state" onChange={handleInputChange} /><br />
          <button type="submit" name="locationSubmit" onClick={handleButtonClick} >Submit</button>
        </div>

        
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
              <label for="setDestination">Destination: {`Lat: ${newTrailObj.origin.lat()}, Lng: ${newTrailObj.origin.lng()}`}</label><br />
            </>
          }
          <button name="findWithinRadius" onClick={handleButtonClick}>Find Trails Within Radius</button>


          <div className="trail-maker-waypoints">
              {newTrailObj.waypoints.map((wp, i) => (
                <>
                  <button for={`setWaypoint${i + 1}`} onClick={event => { event.preventDefault(); setCurrentMarker(`Waypoint${i + 1}`) }}>Set Waypoint</button>
                  <label for="setOrigin">Waypoint #{i + 1}: {`Lat: ${wp.lat()}, Lng: ${wp.lng()}`}</label><br />
                  <button data-index={i} onClick={handleRemoveWaypoint}>x</button><br/>
                </>
              ))}

              <button onClick={event => { event.preventDefault(); setCurrentMarker(`Waypoint${newTrailObj.waypoints.length + 1}`) }}>Set {newTrailObj.waypoints.length > 0 ? "Another Waypoint?" : "A Waypoint"}</button><br />
          </div>


        </div>
      </form>
      {/* <h5>{JSON.stringify(newTrailObj)}</h5>
      <h5>{JSON.stringify(centerCoords)}</h5> */}
      <CreateRouteMap className="map-container" centerCoords={centerCoords} setCenterCoords={setCenterCoords} newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} currentMarker={currentMarker} setCurrentMarker={setCurrentMarker}/>
    </div>
  )
}

export default CreateRouteForm;