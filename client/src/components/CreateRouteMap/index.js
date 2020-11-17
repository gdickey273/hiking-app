import React, { useState } from "react";
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";


function CreateRouteMap(props) {
  const { currentMarker, setCurrentMarker, newTrailObj, setNewTrailObj } = props;

  console.log(currentMarker);

  function handleMapClick(mapProps, map, event) {
    if (currentMarker) {
      switch (currentMarker) {
        case "Origin":
          setNewTrailObj({ ...newTrailObj, origin: event.latLng });
          setCurrentMarker("");
          break;
        case "Destination":
          setNewTrailObj({ ...newTrailObj, destination: event.latLng });
          setCurrentMarker("");
          break;
        default:
          setNewTrailObj({ ...newTrailObj, waypoints: [...newTrailObj.waypoints, event.latLng] });
          setCurrentMarker("");

      }
    }
  }

  const polyCoords = [];
  if (newTrailObj.origin && newTrailObj.waypoints.length > 0) {
    polyCoords.push(newTrailObj.origin);
    polyCoords.push.apply(polyCoords, [...newTrailObj.waypoints]);
  }
  if (polyCoords.length > 0) {
    if (newTrailObj.trailType === "aToB") {
      if(newTrailObj.destination) {
        polyCoords.push(newTrailObj.destination);
      }
    } else if (newTrailObj.trailType) {
      polyCoords.push(newTrailObj.origin);
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
          title="Destination" />
      }

      {polyCoords.length > 2 &&
        <Polyline
          path={polyCoords}
          strokeColor="#008000"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      }
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
})(CreateRouteMap)