import React from 'react';
import ReactDOM from 'react-dom';

class trailMap extends React.Component {
  render() {
    return (
      <div>
        <iframe
            width="1200"
            height="700"
            frameborder="0" style="border:0"
            src= "https://www.google.com/maps/embed/v1/directions?key=AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c&origin=35.877552,-78.661532&destination=35.861145,-78.708803&mode=walking" >
        </iframe>
      </div>

    );
  }
}

export default trailMap;
