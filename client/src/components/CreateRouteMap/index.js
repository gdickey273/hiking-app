import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";


function CreateRouteMap(props) {
  const { currentMarker, setCurrentMarker, newTrailObj, setNewTrailObj, centerCoords } = props;
  const [currentLocation, setCurrentLocation] = useState({});


  useEffect(() => {
    console.log(centerCoords);
    // if(navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((data) => {
    //     const lat = data.coords.latitude;
    //     const lng = data.coords.longitude;
    //     setCurrentLocation({lat, lng});
    //   })
    // }
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
          // setCurrentMarker("");

      }
    }
  }

  function handleMarkerDrag(x, marker, y) {
    const la = marker.position.lat();
    const ln = marker.position.lng();
    const latLng = marker.position;

    if (marker.title === "Origin" || marker.title === "Destination") {
      let key = marker.title.toLowerCase();
      console.log("marker.title------------------", marker.title);
      console.log("marker.title.toLowercase()", marker.title.toLowerCase())

      setNewTrailObj({ ...newTrailObj, [key]: y.latLng });
    } else {
      const i = parseInt(marker.title);
      const arr = newTrailObj.waypoints;
      arr.splice(i, 1, y.latLng);

      setNewTrailObj({ ...newTrailObj, waypoints: arr });
    }

  }

  //Returns an index in waypoint array at which new marker should be inserted
  function findNewMarkerIndex(newMarker, precision = .0000000001) {
    //returns true if point is between start and end points
    function isBetween(start, end, point) {
      const PRECISION = precision;
      console.log("end.lat", end.lat, "point.lng", point.lng, "start.lat", start.lat);
      const result = Math.abs((end.lat() - start.lat()) * (point.lng() - start.lng()) - (end.lng() - start.lng()) * (point.lat() - start.lat())) < PRECISION;
      console.log("result: ", result);
      return result;
    }

    const { origin, waypoints, destination, trailType } = newTrailObj;

    if (isBetween(origin, waypoints[0], newMarker)) {
      return 0;
    }
   
    for (let i = 0; i < waypoints.length -1; i++) {
      if(isBetween(waypoints[i], waypoints[i+1], newMarker)) {
        return i+1;
      }
    }

    if(trailType === "aToB") {
      if (isBetween(waypoints[waypoints.length-1], destination, newMarker)) {
        return waypoints.length;
      }
    } else {
      if (isBetween(waypoints[waypoints.length-1], origin, newMarker)) {
        return waypoints.length
      }
    }
    
    //If index isn't yet found, try again with less precision
    return findNewMarkerIndex(newMarker, precision*10);
  }
  
  //onPolylineClick, create new waypoint on polyline between adjacent markers
  function handlePolylineClick(a, b, c) {
    const position = c.latLng;
    const newIndex = findNewMarkerIndex(position);
    const arr = newTrailObj.waypoints;
    arr.splice(newIndex, 0, position);
    setNewTrailObj({ ...newTrailObj, waypoints: arr});
    console.log("finding new index!------------", newIndex);

  }

  function getWaypointIconUrl(index) {
    let iconNumber;
    if (index < 8) {
      iconNumber = 48 + index;
    } else if (index < 16) {
      iconNumber = 32 + index;
    } else if (index < 24) {
      iconNumber = 8 + index;
    } else if (index < 26) {
      iconNumber = index - 16;
    }
    
    if (iconNumber) {
      return `http://maps.google.com/mapfiles/kml/pal5/icon${iconNumber}.png`
    } 

    if (index < 36) {
      iconNumber = index - 18;
      return `http://maps.google.com/mapfiles/kml/pal3/icon${iconNumber}.png`;
    }
  }
  const polyCoords = [];
  if (newTrailObj.trailType === "aToB"){
    if (newTrailObj.origin && newTrailObj.waypoints.length > 0 && newTrailObj.destination){
      polyCoords.push(newTrailObj.origin);
      polyCoords.push.apply(polyCoords, [...newTrailObj.waypoints]);
      polyCoords.push(newTrailObj.destination);
    }
  } else if (newTrailObj.origin && newTrailObj.waypoints.length > 0) {
    polyCoords.push(newTrailObj.origin);
    polyCoords.push.apply(polyCoords, [...newTrailObj.waypoints]);
  }
  if (polyCoords.length > 0) {
     if (newTrailObj.trailType === "loop") {
      polyCoords.push(newTrailObj.origin);
    }
  }


  return (
    <Map
      google={props.google}
      zoom={13}
      style={{ width: "100vw", height: "100vh" }}
      streetViewControl={false}
      fullscreenControl={false}
      onClick={handleMapClick}
      initialCenter={centerCoords}
      mapType= "hybrid"
    >
      {newTrailObj.origin &&
        <Marker
          position={newTrailObj.origin}
          draggable={true}
          onDragend={handleMarkerDrag}
          title={"Origin"}
          strokeColor="#ffffff"
          icon="http://maps.google.com/mapfiles/kml/pal2/icon4.png"
        />
      }
      {newTrailObj.waypoints.map((wp, i) => (
        <Marker
          position={wp}
          draggable={true}
          onDragend={handleMarkerDrag}
          title={"" + i}
          key={i}
          icon={getWaypointIconUrl(i)}

        />
      ))}

      {newTrailObj.destination && newTrailObj.trailType === "aToB" &&
        <Marker
          position={newTrailObj.destination}
          draggable={true}
          onDragend={handleMarkerDrag}
          title="Destination"
          icon="http://maps.google.com/mapfiles/kml/pal4/icon21.png" />
      }

      {polyCoords.length > 2 &&
        <Polyline
          path={polyCoords}
          strokeColor="#c94e02"
          strokeOpacity={1}
          strokeWeight={5}
          onClick={handlePolylineClick}
        />
      }
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
})(CreateRouteMap)