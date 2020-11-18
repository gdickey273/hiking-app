import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";


function CreateRouteMap(props) {
  const { currentMarker, setCurrentMarker, newTrailObj, setNewTrailObj } = props;
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const lat = data.coords.latitude;
        const lng = data.coords.longitude;
        setCurrentLocation({lat, lng});
      })
    }
  })

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

  function handleMarkerDrag(x, marker, y) {
    console.log(newTrailObj)
    const la = marker.position.lat();
    const ln = marker.position.lng();
    const latLng = marker.position;
    console.log(marker)
    console.log(marker.title)
    const i = parseInt(marker.title);
    const arr = newTrailObj.waypoints.splice(i, 1, {lat: la, lng: ln});
    console.log(arr);
    
    setNewTrailObj({...newTrailObj, waypoints: arr})
   
  
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
      zoom={10}
      style={{ width: "50%", height: "50%" }}
      streetViewControl={false}
      fullscreenControl={false}
      onClick={handleMapClick}
      center={currentLocation}
    >
      {newTrailObj.origin &&
        <Marker
          position={newTrailObj.origin}
          title={"Origin"}
          strokeColor="#ffffff"
        />
      }
      {newTrailObj.waypoints.map((wp, i) => (
        <Marker
          position={wp}
          draggable={true}
          onDragend={handleMarkerDrag}
          title={""+i}
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