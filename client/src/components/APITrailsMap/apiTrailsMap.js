import React, { useEffect, useState } from "react";
import extAPI from "../../utils/extAPI";

function APITrailsMap(props) {
  const [url, setUrl] = useState({})

  let trailName = props.name;

  useEffect(() => {
    extAPI.getTrailMap(trailName)
      .then(res =>
        setUrl(res.data))
      .catch(err => console.log(err));
  }, [trailName]);

  return (
    <div>
      <iframe
        width="600"
        height="450"
        frameBorder="0" style={{ border: "0" }}
        allowFullScreen="" src={url}>
      </iframe>
    </div>
  );
}

export default APITrailsMap;

