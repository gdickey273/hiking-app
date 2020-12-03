import React, { useState, useEffect } from "react";
import { Map, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";

function UserPolylineMap(props) {
  const { trail } = props;
  const [polyCoords, setPolyCoords] = useState([]);
  const [trailObj, setTrailObj] = useState({});

  useEffect(() => {
    const origin = { lat: trail.originLat, lng: trail.originLng };
    let destination;
    if (trail.destination) {
      let dest = trail.destination.split(",");
      let destLat = parseFloat(dest[0]);
      let destLng = parseFloat(dest[1]);
      destination = { lat: destLat, lng: destLng };
    }

    const waypoints = [];
    trail.waypoints.forEach(wp => {
      const wpLat = parseFloat(wp.split(",")[0]);
      const wpLng = parseFloat(wp.split(",")[1]);
      waypoints.push({ lat: wpLat, lng: wpLng });
    })


    const polyArr = [];
    polyArr.push(origin);
    polyArr.push.apply(polyArr, [...waypoints]);

    if (trail.trailType === "A to B" || trail.trailType === "Out 'n Back") {
      polyArr.push(destination);
    }

    if (trail.trailType === "Loop") {
      polyArr.push(origin);
    }

    setTrailObj({ origin, destination, waypoints });
    setPolyCoords(polyArr);
    console.log("----------trailObj------------", origin, destination, waypoints);
  }, [trail.trailType]);

  return (
    <>
      {trailObj.origin &&
        <Map
          google={props.google}
          style={{ width: "100%", height: "100%" }}
          zoom={15}
          streetViewControl={false}
          fullscreenControl={false}
          initialCenter={trailObj.origin}
          mapType="hybrid"
        >
          <Marker
            position={trailObj.origin}
            draggable={false}
            title={"Origin"}
            icon="http://maps.google.com/mapfiles/kml/pal2/icon4.png"
          />
          {trail.destination &&
            <Marker
              position={trailObj.destination}
              draggable={false}
              title="Destination"
              icon="http://maps.google.com/mapfiles/kml/pal4/icon21.png" />
          }

          <Polyline
            path={polyCoords}
            strokeColor="#c94e02"
            strokeOpacity={1}
            strokeWeight={5} />
        </Map>
      }
    </>
  )
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.APIKey
  }))(UserPolylineMap)