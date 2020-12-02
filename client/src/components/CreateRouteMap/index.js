import React from "react";
import { Map, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";

function CreateRouteMap(props) {
  const { currentMarker, setCurrentMarker, newTrailObj, setNewTrailObj, centerCoords } = props;
  const waypointNameString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  function handleMapClick(mapProps, map, event) {
    if (currentMarker) {
      switch (currentMarker) {
        case "Origin":
          setNewTrailObj({ ...newTrailObj, origin: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
          setCurrentMarker("");
          break;
        case "Destination":
          setNewTrailObj({ ...newTrailObj, destination: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
          setCurrentMarker("");
          break;
        default:
          setNewTrailObj({ ...newTrailObj, waypoints: [...newTrailObj.waypoints, { lat: event.latLng.lat(), lng: event.latLng.lng() }] });
      }
    }
  }

  function handleMarkerDrag(x, marker, y) {

    if (marker.title === "Origin" || marker.title === "Destination") {
      let key = marker.title.toLowerCase();
      setNewTrailObj({ ...newTrailObj, [key]: { lat: y.latLng.lat(), lng: y.latLng.lng() } });
    } else {
      //if dragged marker is a waypoint update that waypoint's coordinates in the newTrailObj.waypoint array
      const i = parseInt(marker.title.split(".")[0]);
      const arr = newTrailObj.waypoints;
      arr.splice(i, 1, { lat: y.latLng.lat(), lng: y.latLng.lng() });

      setNewTrailObj({ ...newTrailObj, waypoints: arr });
    }

  }

  //Returns an index in waypoint array at which new marker should be inserted
  function findNewMarkerIndex(newMarker, precision = .0000000001) {
    //returns true if point is between start and end points
    function isBetween(start, end, point) {
      const PRECISION = precision;
      const result = Math.abs((end.lat - start.lat) * (point.lng - start.lng) - (end.lng - start.lng) * (point.lat - start.lat)) < PRECISION;
      return result;
    }

    const { origin, waypoints, destination, trailType } = newTrailObj;

    if (isBetween(origin, waypoints[0], newMarker)) {
      return 0;
    }

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (isBetween(waypoints[i], waypoints[i + 1], newMarker)) {
        return i + 1;
      }
    }

    if (trailType === "A to B") {
      if (isBetween(waypoints[waypoints.length - 1], destination, newMarker)) {
        return waypoints.length;
      }
    } else {
      if (isBetween(waypoints[waypoints.length - 1], origin, newMarker)) {
        return waypoints.length
      }
    }

    //If index isn't yet found, try again with less precision
    return findNewMarkerIndex(newMarker, precision * 10);
  }

  //onPolylineClick, create new waypoint on polyline between adjacent markers
  function handlePolylineClick(a, b, c) {
    if (newTrailObj.waypoints.length < 5 || newTrailObj.isPolylinePath) {
      const position = { lat: c.latLng.lat(), lng: c.latLng.lng() };
      console.log("-----------------position------------------", position);
      const newIndex = findNewMarkerIndex(position);
      const arr = newTrailObj.waypoints;
      arr.splice(newIndex, 0, position);
      setNewTrailObj({ ...newTrailObj, waypoints: arr });
    }
  }

  function getWaypointIconUrl(index) {
    let iconNumber;
    if (index < 7) {
      iconNumber = 49 + index;
    } else if (index < 15) {
      iconNumber = 33 + index;
    } else if (index < 23) {
      iconNumber = 9 + index;
    } else if (index < 25) {
      iconNumber = index - 15;
    }

    if (iconNumber) {
      return `http://maps.google.com/mapfiles/kml/pal5/icon${iconNumber}.png`
    }

    if (index < 34) {
      iconNumber = index - 17;
      return `http://maps.google.com/mapfiles/kml/pal3/icon${iconNumber}.png`;
    }
  }
  const polyCoords = [];

  if (newTrailObj.trailType === "A to B") {
    if (newTrailObj.origin && newTrailObj.waypoints.length > 0 && newTrailObj.destination) {
      polyCoords.push(newTrailObj.origin);
      polyCoords.push.apply(polyCoords, [...newTrailObj.waypoints]);
      polyCoords.push(newTrailObj.destination);
    }
  } else if (newTrailObj.origin && newTrailObj.waypoints.length > 0) {
    polyCoords.push(newTrailObj.origin);
    polyCoords.push.apply(polyCoords, [...newTrailObj.waypoints]);
  }
  if (polyCoords.length > 0) {
    if (newTrailObj.trailType === "Loop") {
      polyCoords.push(newTrailObj.origin);
    }
  }

  return (

    <Map
      google={props.google}
      zoom={13}
      style={{ width: "100vw", height: "100vh", marginLeft: "-100vw" }}
      streetViewControl={false}
      fullscreenControl={false}
      onClick={handleMapClick}
      initialCenter={centerCoords}
      mapType="hybrid"
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
          title={i + ". Waypoint-" + waypointNameString[i]}
          key={i}
          icon={getWaypointIconUrl(i)}

        />
      ))}

      {newTrailObj.destination && newTrailObj.trailType === "A to B" &&
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

export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.APIKey
  }))(CreateRouteMap)