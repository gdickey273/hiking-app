/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

function UserTrailsMap(props) {
  console.log(props);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    // const origin = { lat: 35.886116, lng: -78.960417 };
    const originLatitude = parseFloat(props.origin.split(',')[0]);
    const originLongitude = parseFloat(props.origin.split(',')[1]);
    const newOrigin = { lat: originLatitude, lng: originLongitude };
    // const destination = { lat: 35.886116, lng: -78.960417 };
    setOrigin(newOrigin)
    const destLatitude = parseFloat(props.destination.split(',')[0]);
    const destLongitude = parseFloat(props.destination.split(',')[1]);
    const destination = { lat: destLatitude, lng: destLongitude };
    const waypoints = [];

    for (let i = 0; i < props.waypoints.length; i++) {
      waypoints.push({
        location: new google.maps.LatLng(props.waypoints[i])
      })
    }

    console.log(origin);

    directionsService.route(
      {
        origin: newOrigin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypoints
        // waypoints: [
        //   {
        //     location: new google.maps.LatLng(35.862905, -78.976748)
        //   }
        // ]
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result)
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);


  const TrailMapComponent = withGoogleMap(props => (
    <GoogleMap
      // defaultCenter={{ lat: 35.886116, lng: -78.960417 }}
      defaultCenter={origin}
      defaultZoom={13}
    >
      <DirectionsRenderer
        directions={directions}
      />
    </GoogleMap>
  ));
  return origin && (
    <TrailMapComponent
      containerElement={<div style={{ height: `500px`, width: "500px" }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );

}

export default UserTrailsMap;

