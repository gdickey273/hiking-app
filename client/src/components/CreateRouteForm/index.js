import { use } from "passport";
import React, { useState } from "react";
import CreateRouteMap from "../CreateRouteMap";

const CreateRouteForm = (prop) => {

  const [newTrailObj, setNewTrailObj] = useState({});
  const [currentMarker, setCurrentMarker] = useState("");

  const handleTypeClick = (event) => {
    setNewTrailObj({ ...newTrailObj, trailType: event.target.value });
    console.log(event.target.value);
  }
  return (
    <div>

      <form>
        <div onClick={handleTypeClick}>
          <input type="radio" name="trailType" value="loop" />
          <label for="male">Loop</label><br />
          <input type="radio" id="female" name="trailType" value="outAndBack" />
          <label for="female">Out 'n Back</label><br />
          <input type="radio" id="other" name="trailType" value="aToB" />
          <label for="other">A to B</label>
        </div>
      </form>
    </div>

  )
}

export default CreateRouteForm;