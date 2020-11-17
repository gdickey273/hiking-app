import React, { useState } from "react";
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";


function CreateRouteMap(props) {
  const { currentMarker, newTrailObj, setNewTrailObj } = props;

  console.log(currentMarker);

  function handleMapClick(mapProps, map, event) {
    if (currentMarker) {
      switch (currentMarker) {
        case "Origin":
          setNewTrailObj({ ...newTrailObj, origin: event.latLng });
          break;
        case "Destination":
          setNewTrailObj({ ...newTrailObj, destination: event.latLng });
          break;
        default:
          setNewTrailObj({ ...newTrailObj, waypoints: [...newTrailObj.waypoints, event.latLng] })

      }
    }
  }

  return (
    <Map
      google={props.google}
      zoom={14}
      style={{ width: "50%", height: "50%" }}
      streetViewControl={false}
      fullscreenControl={false}
      onClick={handleMapClick}

    >
      {newTrailObj.origin &&
        <Marker
          position={newTrailObj.origin}
          title={"Origin"}
        />
      }
      {newTrailObj.waypoints.map((wp, i) => (
        <Marker
          position={wp}
          draggable={true}
          title={"Waypoint #" + i}
          key={i}
        />
      ))}

      {newTrailObj.destination && 
      <Marker 
        position={newTrailObj.destination}
        title="Destination"/>
      }
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
})(CreateRouteMap)