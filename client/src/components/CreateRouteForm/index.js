import React, { useState, useEffect } from "react";
import CreateRouteMarkers from "./CreateRouteMarkers";
import CreateRouteInfo from "./CreateRouteInfo";
import APITrailsMap from "../APITrailsMap";
import extAPI from "../../utils/extAPI";

const CreateRouteForm = (props) => {

  const [newTrailObj, setNewTrailObj] = useState({ waypoints: [] });
  const [centerCoords, setCenterCoords] = useState({});
  const [formStage, setFormStage] = useState("init");
  const [API, setAPI] = useState({ const: 1 });

  useEffect(() => {
    extAPI.getGoogleKey()
      .then(res =>
        setAPI({ ...API, key: res.data }))
      .catch(err => console.log(err))
  }, [API.const])

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
      <div>
      {/* {!props.loggedIn &&
        <div className="trail-maker">
          <div className="trail-maker-heading">
            <h2>Trail Maker</h2>
            <p>Log in to create a new route to add to your collection!</p>
          </div>
        </div>
      } */}

      {props.loggedIn &&
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
                      <label>Loop</label><br />
                    </div>
                    <div>
                      <input type="radio" name="trailType" value="Out 'n Back" onClick={handleTypeClick} />
                      <label>Out 'n Back</label><br />
                    </div>
                    <div>
                      <input type="radio" name="trailType" value="A to B" onClick={handleTypeClick} />
                      <label>A to B</label>
                    </div>
                  </div>
                  <input type="submit" name="submit" onClick={handleButtonClick} />
                </>}
            </form>
          </div>

          {/* <h5>{JSON.stringify(newTrailObj)}</h5>
          <h5>{JSON.stringify(centerCoords)}</h5> */}
        </div >}
    </div>

    <div className="loggedout-trailviewmap">
          {formStage === "init" &&
            <APITrailsMap
              name="map of the Triangle"
              originLat="35.878547"
              originLng="-78.830304"
              zoom="10" />
          }

          {centerCoords.lat && (formStage === "route" || formStage === "preview") &&
            <CreateRouteMarkers
              newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj}
              centerCoords={centerCoords} setCenterCoords={setCenterCoords}
              formStage={formStage} setFormStage={setFormStage}
              APIKey={API.key} />

          }

          {formStage === "info" &&
            <CreateRouteInfo
              newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} setTrailId={props.setTrailId}/>
          }
      </div>
    </div>
  )
}

export default CreateRouteForm;