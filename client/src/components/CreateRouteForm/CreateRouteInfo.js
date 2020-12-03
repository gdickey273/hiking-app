import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import extAPI from "../../utils/extAPI";



function CreateRouteInfo(props) {
  const { newTrailObj, setNewTrailObj } = props;
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [durationAlert, setDurationAlert] = useState(false);
  const [commentAlert, setCommentAlert] = useState(false);

  //On page load send request to backend for trail distance and update state to render on form
  useEffect(() => {
    async function fetchDistance() {
      const response = await extAPI.getTrailDistance(newTrailObj.origin, newTrailObj.waypoints, newTrailObj.trailType, newTrailObj.destination)
      setNewTrailObj({ ...newTrailObj, length: Math.round(response.data.totalLength * 100) / 100 });
    }
    fetchDistance();
  }, [newTrailObj.origin]);

  function handleInputChange(event) {
    const { name, value } = event.target;
  
    setNewTrailObj({ ...newTrailObj, [name]: value });
  }

  function handleFileSelected(event) {
    const { name, value } = event.target;

    if (name === 'photos') {
      setFileSelected(true)
      setNewTrailObj({
        ...newTrailObj,
        [name]: event.target.files[0]
      })
    }
  }

  function uploadImage(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', newTrailObj.photos);

    extAPI.uploadImage(fd)
      .then(res => {
        setNewTrailObj({ ...newTrailObj, photos: res.data.imageURL });
        setUploadSuccessful(true);
      })
      .catch(err => console.log(err));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if(newTrailObj.rating === undefined || newTrailObj.comments === undefined) {
      setCommentAlert(true);
    } else if(newTrailObj.duration !== undefined && typeof newTrailObj.duration !== 'number') {
      setDurationAlert(true);
    } else {
      const waypointArr = newTrailObj.waypoints.map(wp => {
        return `${wp.lat}, ${wp.lng}`
      });
      let destination;
      if (newTrailObj.trailType === "Loop") {
        destination = `${newTrailObj.origin.lat}, ${newTrailObj.origin.lng}`;
      } else if (newTrailObj.trailType === "Out 'n Back") {
        destination = waypointArr.pop();
      } else destination = `${newTrailObj.destination?.lat}, ${newTrailObj.destination?.lng}`;
  
      const acent = parseFloat(newTrailObj.ascent);
      const decent = parseFloat(newTrailObj.decent);
      const elevation = decent > 0 ? [acent, decent * -1] : [acent, decent];
  
      const trailObj = {
        name: newTrailObj.trailName,
        city: newTrailObj.city,
        state: newTrailObj.state,
        originLat: newTrailObj.origin.lat,
        originLng: newTrailObj.origin.lng,
        destination,
        waypoints: waypointArr,
        trailType: newTrailObj.trailType,
        rating: newTrailObj.rating,
        comments: newTrailObj.comments,
        length: newTrailObj.length,
        terrain: newTrailObj.terrain,
        currentCondition: newTrailObj.condition,
        duration: newTrailObj.duration,
        trafficLevels: newTrailObj.traffic,
        waterSources: newTrailObj.waterSources,
        elevation,
        userVerified: 1,
        isPolylinePath: newTrailObj.isPolylinePath ? 1 : 0,
        photos: newTrailObj.photos
      }
  
      if (trailObj.trailType === "aToB") {
        trailObj.destination = `${newTrailObj.destination.lat}, ${newTrailObj.destination.lng}`;
      }
  
      API.saveTrail(trailObj)
        .then(res => {
          props.setTrailId(res.data._id);
        })
        .catch(err => console.log(err));
    }
  }
  return (
    <>
      <div>
        <form>
          <label>*Trail Name</label><br />
          <input name="trailName" onChange={handleInputChange} value={newTrailObj.trailName} /><br />
          <label>*City</label><br />
          <input name="city" onChange={handleInputChange} value={newTrailObj.city} /><br />
          <label>*State</label><br />
          <input name="state" onChange={handleInputChange} value={newTrailObj.state} /><br />
          <label>*Your Rating 1-5</label><br />
          <input type="number" min="1" max="5" name="rating" onChange={handleInputChange} value={newTrailObj.rating} /><br />
          <label>*Length (in miles)</label><br />
          <input name="length" onChange={handleInputChange} value={newTrailObj.length} /><br />
          <label>*Comments</label><br />
          <textarea maxLength="500" onChange={handleInputChange} name="comments" value={newTrailObj.comments}></textarea>
          <label>Elevation Ascent (in feet)</label><br />
          <input name="ascent" onChange={handleInputChange} value={newTrailObj.ascent}></input>
          <label>Elevation Descent (in feet)</label><br />
          <input name="decent" onChange={handleInputChange} value={newTrailObj.decent}></input>
          <label>Terrain</label><br />
          <input name="terrain" onChange={handleInputChange} value={newTrailObj.terrain}></input>
          <label>Current Condition</label><br />
          <input name="condition" onChange={handleInputChange} placeholder="Well maintained, fallen trees, etc." value={newTrailObj.condition} /><br />
          <label>Duration (in minutes)</label><br />
          <input name="duration" onChange={handleInputChange} value={newTrailObj.duration}></input>
          <label>Traffic Levels</label><br />
          <input name="traffic" onChange={handleInputChange} value={newTrailObj.traffic}></input>
          <label>Water Sources</label><br />
          <input name="waterSources" onChange={handleInputChange} value={newTrailObj.waterSources}></input>
          <label>Add Photos</label><br />
          <input name="photos" onChange={handleFileSelected} type='file'
            accept='.jpg, .png, .jpeg' /><br />
          {fileSelected &&
            <button
              type='button'
              disabled={!fileSelected}
              onClick={uploadImage}>
              Upload Image
            </button>
          }
          {uploadSuccessful && 
          <p>Upload Successful! <i className="fas fa-check"></i></p>
          }

          <button onClick={handleSubmit}>Submit Trail</button>
          {commentAlert && 
            <p>Trail rating and your comments are required!</p>
          }
          {durationAlert && 
            <p>Duration must be a number in minutes (i.e. 60).</p>
          }
        </form>
      </div>
    </>
  );
}

export default CreateRouteInfo;