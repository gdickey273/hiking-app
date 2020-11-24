import { use } from "passport";
import React, { useState } from "react";
import CreateRouteMarkers from "./CreateRouteMarkers";
import extAPI from "../../utils/extAPI";
import API from "../../utils/API";
import { set } from "mongoose";

const CreateRouteForm = (prop) => {

  const [newTrailObj, setNewTrailObj] = useState({ waypoints: [] });

  const [centerCoords, setCenterCoords] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    const { name } = event.target;

    if (name === "submit") {
      console.log("form submit!");
    let formComplete = true;
    console.log()
    if(!newTrailObj.state){
      console.log("state false");
      formComplete = false;
    }

    if(!newTrailObj.city){
      console.log("city false");
      formComplete = false;
    }

    if(!newTrailObj.trailType){
      console.log("type false");
      formComplete = false;
    }

    if(!newTrailObj.trailName){
      console.log("name false");
      formComplete = false;
    }

    if(formComplete) {
      console.log("form complete! Setting centerCoords");
      extAPI.getCoordinates(newTrailObj.city, newTrailObj.state)
      .then(res => {
        setCenterCoords(res.data)});
    }
    }
    if (name === "findWithinRadius") {
      API.getTrailsWithinRadius({ lat: 35.7795897, lng: -78.6381787 }, 50)
        .then(res => {
          console.log(res);
        })
        ;
    }
  }
  const handleTypeClick = (event) => {
    setNewTrailObj({ ...newTrailObj, trailType: event.target.value });
    console.log(event.target.value);
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

          <div>
            <label>Trail Name</label><br />
            <input type="text" name="trailName" onChange={handleInputChange}/>
            <br />
            {centerCoords.lat ?
              <>
                <h5>City: {newTrailObj.city}</h5>
                <h5>State: {newTrailObj.state}</h5>
              </>
              :
              <>
                <label for="city">City</label><br />
                <input type="text" name="city" onChange={handleInputChange} /><br />
                <label for="state">State</label><br />
                <input type="text" name="state" onChange={handleInputChange} /><br />
              </>
            }

          </div>
          <div className="trail-maker-input" onClick={handleTypeClick}>

            <div>
              <input type="radio" name="trailType" value="loop" />
              <label for="trailType">Loop</label><br />
            </div>
            <div>
              <input type="radio" name="trailType" value="outAndBack" />
              <label for="trailType">Out 'n Back</label><br />
            </div>
            <div>
              <input type="radio" name="trailType" value="aToB" />
              <label for="other">A to B</label>
            </div>

          </div>
          <input type="submit" name="submit" onClick={handleButtonClick}/>

        </form>
            
        {centerCoords.lat &&
          <CreateRouteMarkers newTrailObj={newTrailObj} setNewTrailObj={setNewTrailObj} centerCoords={centerCoords} setCenterCoords={setCenterCoords} />
        }
      </div>

      <h5>{JSON.stringify(newTrailObj)}</h5>
      <h5>{JSON.stringify(centerCoords)}</h5>
    </div>
  )
}

export default CreateRouteForm;