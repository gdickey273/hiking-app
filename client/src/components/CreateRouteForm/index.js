import React, { useState } from "react";
import CreateRouteMarkers from "./CreateRouteMarkers";
import CreateRouteInfo from "./CreateRouteInfo";
import extAPI from "../../utils/extAPI";

const CreateRouteForm = (prop) => {

  const [newTrailObj, setNewTrailObj] = useState({ waypoints: [] });
  const [centerCoords, setCenterCoords] = useState({});
  const [formStage, setFormStage] = useState("init");

  const handleFormSubmit = (event) => {
    event.preventDefault();

  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    const { name } = event.target;

    if (name === "submit") {
      let formComplete = true;
      if (!newTrailObj.state) {
        formComplete = false;
      }
      if (!newTrailObj.city) {
        formComplete = false;
      }
      if (!newTrailObj.trailType) {
        formComplete = false;
      }
      if (!newTrailObj.trailName) {
        formComplete = false;
      }

      if (formComplete) {
        extAPI.getCoordinates(newTrailObj.city, newTrailObj.state)
          .then(res => {
            setCenterCoords(res.data)
          });
        setFormStage("route");
      }
    }
    // if (name === "findWithinRadius") {
    //   API.getTrailsWithinRadius({ lat: 35.7795897, lng: -78.6381787 }, 50)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     ;
    // }
  }
  const handleTypeClick = (event) => {
    setNewTrailObj({ ...newTrailObj, trailType: event.target.value });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTrailObj({ ...newTrailObj, [name]: value });
  }


  return (
    <div>
      <div className="trail-maker">
        <form className="map-form" onSubmit={handleFormSubmit}>
          <div className="trail-maker-heading">
            <h2>Trail Maker</h2>
            <p>Create a new route to add to your collection</p>
          </div>

          {formStage === "init" &&
            <>
              <div>
                <label>Trail Name</label><br />
                <input type="text" name="trailName" onChange={handleInputChange} />
                <br />
                {centerCoords.lat ?
                  <>
                    <h5>City: {newTrailObj.city}</h5>
                    <h5>State: {newTrailObj.state}</h5>
                  </>
                  :
                  <>
                    <label>City</label><br />
                    <input type="text" name="city" onChange={handleInputChange} /><br />
                    <label>State</label><br />
                    <input type="text" name="state" onChange={handleInputChange} /><br />
                  </>
                }

              </div>
              <div className="trail-maker-input">

                <div>
                  <input type="radio" name="trailType" value="Loop" onClick={handleTypeClick} />
                  <label for="trailType">Loop</label><br />
                </div>
                <div>
                  <input type="radio" name="trailType" value="Out 'n Back" onClick={handleTypeClick} />
                  <label for="trailType">Out 'n Back</label><br />
                </div>
                <div>
                  <input type="radio" name="trailType" value="A to B" onClick={handleTypeClick} />
                  <label for="other">A to B</label>
                </div>

              </div>
              <input type="submit" name="submit" onClick={handleButtonClick} />
            </>}
        </form>

        {formStage === "route" && centerCoords.lat &&
          <CreateRouteMarkers
            newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj}
            centerCoords={centerCoords} setCenterCoords={setCenterCoords}
            formStage={formStage} setFormStage={setFormStage} 
            key={"key"}/>
        }

        {formStage === "info" &&
          <CreateRouteInfo
            newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} />
        }
      </div>

      <h5>{JSON.stringify(newTrailObj)}</h5>
      <h5>{JSON.stringify(centerCoords)}</h5>
    </div>
  )
}

export default CreateRouteForm;