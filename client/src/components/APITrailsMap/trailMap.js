import React from "react";
import extAPI from "../../utils/extAPI";

function APITrailsMap(props) {
  const url = extAPI.getTrailMap(props.name);
  console.log(url);

  return (
    <iframe width="600"
    height="450"
    frameBorder="0" style={{border: "0"}}
    allowFullScreen src={url}></iframe>
  )
}

export default APITrailsMap;

