/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

function UserTrailsMap(props) {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    let newOrigin = {};
    newOrigin = { lat: props.originLat, lng: props.originLng };
    setOrigin(newOrigin)

    let destination = {};
    const destLatitude = parseFloat(props.destination.split(',')[0]);
    const destLongitude = parseFloat(props.destination.split(',')[1]);
    destination = { lat: destLatitude, lng: destLongitude };

    let waypoints = [];

    if (props.waypoints) {
      
      for (let i = 0; i < props.waypoints.length; i++) {
        let waypointLat = parseFloat(props.waypoints[i].split(',')[0]);
        let waypointLng = parseFloat(props.waypoints[i].split(',')[1]);

        waypoints.push({
          location: new google.maps.LatLng(waypointLat, waypointLng)
        });
      }

      directionsService.route(
        {
          origin: newOrigin,
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.WALKING
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
    } else {
      directionsService.route(
        {
          origin: newOrigin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING
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
    }

  }, []);


  const TrailMapComponent = withGoogleMap(props => (
    <GoogleMap
      defaultCenter={origin}
      defaultZoom={13}
    >
      <DirectionsRenderer
        directions={directions}
      />
    </GoogleMap>
  ));
  return directions && (
    <TrailMapComponent
      containerElement={<div style={{ height: `500px`, width: "500px" }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );

}

export default UserTrailsMap;

