import React, { useEffect, useState } from "react";
import extAPI from "../../utils/extAPI";
import API from "../../utils/API";

function Streetview(props) {
  const [url, setUrl] = useState(null)
 
  const id = props.trailId;

  useEffect(() => {
    API.getTrail(id)
      .then(res =>
        { // console.log(res.data)
        let origin = `${res.data.originLat},${res.data.originLng}`;
        extAPI.getStreetview(origin)
          .then(response =>
            setUrl(response.data))
          })
      .catch(err => console.log(err));
  }, [id]);

  return url && (
    <div className="streetview-map">
      <iframe
        title="streetview"
        width="100%"
        height="625"
        frameBorder="0" style={{ border: "0" }}
        allowFullScreen="" src={url}>
      </iframe>
    </div>
  );
}

export default Streetview;

