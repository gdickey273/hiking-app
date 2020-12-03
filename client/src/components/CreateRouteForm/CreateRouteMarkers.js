import React, { useState, useEffect } from "react";
import { withScriptjs } from "react-google-maps";
import CreateRouteMap from "../CreateRouteMap";
import UserTrailsMap from "../UserTrailsMap";


function CreateRouteMarkers(props) {


  const { APIKey, newTrailObj, setNewTrailObj, centerCoords, setCenterCoords, formStage, setFormStage } = props;
  const [currentMarker, setCurrentMarker] = useState("");
  const [previewCoords, setPreviewCoords] = useState({});
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const waypointNameString = "BCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  useEffect(() => {
    let previewReady = false;
    if (newTrailObj.trailType === "A to B") {
      if (newTrailObj.origin && newTrailObj.waypoints.length > 0 && newTrailObj.destination) {
        previewReady = true;
      }
    } else if (newTrailObj.origin && newTrailObj.waypoints.length > 0) {
      previewReady = true;
    }
    setIsPreviewReady(previewReady);
  }, [newTrailObj]);

  useEffect(() => {
    if (newTrailObj.waypoints.length > 4 && !newTrailObj.isPolylinePath) setCurrentMarker("");
  }, [newTrailObj, currentMarker]);

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

  function formatCoordinates(origin, waypoints, trailType, destination) {
    let res = {};

    res.originLat = origin.lat;
    res.originLng = origin.lng;

    const waypointArr = waypoints.map(wp => `${wp.lat}, ${wp.lng}`);

    switch (trailType) {
      case "A to B":
        res.destination = `${destination.lat}, ${destination.lng}`;
        break;
      case "Loop":
        res.destination = `${origin.lat}, ${origin.lng}`;
        break;
      case "Out 'n Back":
        res.destination = waypointArr.pop();
        break;
    }

    res.waypoints = waypointArr;

    console.log("--------------formatted coords data---------------", res);
    setPreviewCoords(res);
  }


 

  const MapLoader = withScriptjs(UserTrailsMap);
  return (
    <div className="polyline-map-function-a">
      {formStage === "route" && (
        <>
        <div className="test">
          {!newTrailObj.isPolylinePath &&
            <h5>{newTrailObj.trailType === "A to B" ? `Please place markers at trail Origin, Destination, and 5 waypoints in between.` : `Please place markers at trail Origin and 5 waypoints along desired route.`}</h5>
          }

          <div className="test-group">
            <label>Origin (marker A):</label><br />
            <label>{newTrailObj.origin && `Lat: ${newTrailObj.origin.lat.toFixed(3)}, Lng: ${newTrailObj.origin.lng.toFixed(3)}`}</label>
            <button name="setOrigin" onClick={event => { event.preventDefault(); setCurrentMarker("Origin") }}>Set Origin</button>
          </div>

          {newTrailObj.trailType === "A to B"
            ?
            <>
            <div className="test-group">
              <label>Destination: {newTrailObj.destination && `Lat: ${newTrailObj.destination.lat.toFixed(3)}, Lng: ${newTrailObj.destination.lng.toFixed(3)}`}</label>
              <button name="setDestination" onClick={event => { event.preventDefault(); setCurrentMarker("Destination") }}>Set Destination</button>
            </div>
            </>
            :
            <></>
          }

            <button onClick={handleWaypointToggleClick} >{currentMarker === "waypoint" ? "Stop Setting Waypoints" : "Set Waypoints"}</button><br />
            {newTrailObj.waypoints.map((wp, i) => (
              <div key={i}>
                <label key={"label-" + i}>Waypoint (Marker {waypointNameString[i]}): {`Lat: ${wp.lat.toFixed(3)}, Lng: ${wp.lng.toFixed(3)}`}</label>
                <button data-index={i} onClick={handleRemoveWaypoint} key={"remove-" + i}>x</button><br />
              </div>
            ))}
            {isPreviewReady && !newTrailObj.isPolylinePath &&
              <button onClick={event => { event.preventDefault(); setFormStage("preview"); formatCoordinates(newTrailObj.origin, newTrailObj.waypoints, newTrailObj.trailType, newTrailObj.destination) }}>Preview Trail Path</button>
            }
            {newTrailObj.isPolylinePath &&
              <button onClick={event => { event.preventDefault(); setFormStage("info"); }}>Confirm Polyline Path</button>
            }
          </div>
        </>
      )}

      {formStage === "preview" ? (
        <>
          <div className="directions-map-functions">
            <h5>Does this path look right? Please confirm the newly rendered path, reposition waypoints to correct path, or use more waypoints to draw the path.</h5>
            <button onClick={event => { event.preventDefault(); setNewTrailObj({ ...newTrailObj, isPolylinePath: false }); setFormStage("info"); }}>Confirm Rendered Path</button>
            <button onClick={event => { event.preventDefault(); setFormStage("route"); setPreviewCoords()}}>Reposition Points</button>
            <button onClick={event => { event.preventDefault(); setFormStage("route"); setNewTrailObj({ ...newTrailObj, isPolylinePath: true }); }}>Draw Path With Points</button>
          </div>


          <MapLoader
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${APIKey}`}
            loadingElement={<div style={{
              height: `100%`,
              width: `100%`
            }} />}
            originLat={previewCoords.originLat}
            originLng={previewCoords.originLng}
            destination={previewCoords.destination}
            waypoints={previewCoords.waypoints}
          />
        </>
      )
        :
        (
          <CreateRouteMap APIKey={APIKey} formStage={formStage} centerCoords={centerCoords} newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} currentMarker={currentMarker} setCurrentMarker={setCurrentMarker} />
        )}
      </div>
    );
}

export default CreateRouteMarkers;