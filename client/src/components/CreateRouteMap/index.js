import React, { useState } from "react";
import { Map, InfoWindow, Marker, Polyline, GoogleApiWrapper } from "google-maps-react";
import { EnvironmentCredentials } from "aws-sdk";

const CreateRouteMap = (props) => {

  const [markerCoords, setMarkerCoords] = useState([]);

  const handleMapClick = (mapProps, map, event) => {
    setMarkerCoords([...markerCoords, event.latLng]);
  }
  
  return (
    <Map 
      google={props.google}
      zoom={14}
      style={{width:"50%", height:"50%"}}
      streetViewControl={false}
      fullscreenControl={false}
      onClick={handleMapClick}
      
      >
      {markerCoords.map((coords) => (
        <Marker 
        position={coords}
        draggable={true}
        title={coords.title}
        key={coords.title}
        
        />
      ))}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
})(CreateRouteMap)