import React, { useEffect, useState, useRef } from "react";

import { Col, Row, Container } from "../Grid";
import { Card } from "../Card";
import UserTrailsMap from "../UserTrailsMap";
import APITrailsMap from "../APITrailsMap";
import UserPolylineMap from "../UserPolylineMap";
import API from "../../utils/API";
import { withScriptjs } from "react-google-maps";
import extAPI from "../../utils/extAPI";
import { Select, Input } from "../Form";
import StockPhoto from "./stock-trail.jpg";

function Detail(props) {
  const [trail, setTrail] = useState({})
  const [url, setUrl] = useState({})
  const [formObject, setFormObject] = useState({});
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadInitiated, setUploadInitiated] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const formEl = useRef(null);

  // When this component mounts, grab the trail with the _id of props.match.params.id
  // e.g. localhost:3000/trails/599dcb67f0f16317844583fc
  const id = props.trailId;

  useEffect(() => {
    API.getTrail(id)
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));

    extAPI.getAPIKeys()
      .then(res => {
        setUrl(`https://maps.googleapis.com/maps/api/js?key=${res.data.google}`);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (value === "rating") {
      return false;
    }

    if (name === "rating") {
      let newRateCount = trail.rateCount + 1;
      let newRate = ((trail.rating * trail.rateCount) + parseInt(value)) / newRateCount;

      API.updateTrail(id, { ...trail, rating: newRate.toFixed(2), rateCount: newRateCount })
        .then(res => {
          // console.log(res.data)
          formEl.current.reset();
          setTrail(res.data);
        })
        .catch(err => console.log(err));
    }

    if (name === 'photos') {
      setFileSelected(true)
      setFormObject({
        ...formObject,
        [name]: event.target.files[0]
      })
    }

    if (name !== 'photos' && name !== 'rating') {
      if (value !== "") {
        setFormObject({ ...formObject, [name]: value })
      }
    }
  }

  function handleVerify() {
    API.updateTrail(id, { ...trail, userVerified: trail.userVerified + 1 })
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));
  }

  function addFavorite() {
    props.setFavsUpdated(true);
    API.addFavorite(props.user._id, id)
      .then(response =>
        console.log(response.data))
      .catch(err => console.log(err));
  }

  function uploadImage(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', formObject.photos);
    setUploadInitiated(true);

    extAPI.uploadImage(fd)
      .then(res => {
        let photos = trail.photos;
        photos.push(res.data.imageURL);
        setUploadSuccessful(true);

        API.updateTrail(id, { ...trail, photos: photos })
          .then(res => {
            // console.log(res.data)
            formEl.current.reset();
            setTrail(res.data);
          })
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formObject)

    if (formObject === {}) {
      return false;
    }

    API.updateTrail(id, {
      ...trail,
      elevation: [formObject.ascent, formObject.descent],
      currentCondition: formObject.condition,
      date: new Date(),
      duration: formObject.duration,
      terrain: formObject.terrain,
      trailType: formObject.type,
      trafficLevels: formObject.traffic,
      waterSources: formObject.waterSources
    })
      .then(res => {
        // console.log(res.data)
        setTrail(res.data);
      })
      .catch(err => console.log(err));

    setUpdateForm(false);
  }


  const date = new Date(trail.date);
  const formatDate = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;

  const MapLoader = withScriptjs(UserTrailsMap);
  return trail && (
    <div>

      <div className="trail-selected-map">
        {!trail.isPolylinePath && trail.destination &&
          // loads routed map for user created routes
          <MapLoader
            googleMapURL={url}
            loadingElement={<div style={{ height: `100%` }} />}
            originLat={trail.originLat}
            originLng={trail.originLng}
            destination={trail.destination}
            waypoints={trail.waypoints}
          />
        }
        {!trail.isPolylinePath && !trail.destination &&
          // loads google map using origin for API trails which do not contain a destination/waypoints
          <APITrailsMap
            name={trail.name}
            originLat={trail.originLat}
            originLng={trail.originLng}
            zoom="16"
          />
        }

        {trail.isPolylinePath && (
          <UserPolylineMap trail={trail} />
        )}

      </div>

      <div className="trail-selected-container">
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Card>
                <h2 className="trail-name">{trail.name}</h2>
                <h6 className="card-subtitle mb-2 text-muted">{trail.city}, {trail.state}</h6>
                {props.loggedIn &&
                  <button className="favorites-button" style={{ float: 'right' }} onClick={() => addFavorite()}><i className="fas fa-star"></i></button>
                }
                {(trail.photos && trail.photos.length) ? (trail.photos.map((photo, i) => (
                  <img key={i} className="card-img-top" src={photo} alt={trail.name}></img>
                )))
                  :
                  (<img className="card-img-top" src={StockPhoto} alt="stock trail"></img>)
                }

                {!props.loggedIn && <h4>Log in to make updates to this trail!</h4>}
                {props.loggedIn &&
                  <form ref={formEl}>
                    <label>Add Photos</label>
                    <Input
                      name='photos'
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      onChange={handleInputChange} />
                    {fileSelected &&
                      <button
                        className="trail-selected-button"
                        type='button'
                        disabled={!fileSelected}
                        onClick={uploadImage}>
                        Upload Image
                  </button>
                    }
                    {uploadInitiated && !uploadSuccessful &&
                      <p>Uploading Image Please Wait . . . </p>}
                    {uploadSuccessful &&
                      <p>Upload Successful! <i className="fas fa-check"></i></p>
                    }
                  </form>
                }
                {props.loggedIn &&
                  <div className="card-text">Verified by {trail.userVerified} users <button name="userVerified" className="trail-selected-button" onClick={handleVerify}><i className="fas fa-check"></i></button></div>}
                {!props.loggedIn &&
                  <div className="card-text">Verified by {trail.userVerified} users <i className="fas fa-check"></i></div>}
                <div className="card-text"><strong>Rating: </strong>{trail.rating} <i className="fas fa-star"></i>
                  {props.loggedIn && <form ref={formEl}>
                    <Select name="rating" onChange={handleInputChange}>
                      <option value="rating">Rate this Trail</option>
                      <option value="1">1 star</option>
                      <option value="2">2 star</option>
                      <option value="3">3 star</option>
                      <option value="4">4 star</option>
                      <option value="5">5 star</option>
                    </Select>
                  </form>}</div>

                <div className="card-text"><strong>Length: </strong>{trail.length} mi</div>
                {trail.elevation && <div className="card-text"><strong>Elevation: </strong><br />+{trail.elevation[0]}ft (ascending) <br />{trail.elevation[1]}ft (descending)</div>}
                <div className="card-text"><strong>Estimated duration: </strong>{trail.duration}</div>
                <div className="card-text"><strong>Trail Type: </strong> <br />{trail.trailType}</div>
                <div className="card-text"><strong>Terrain: </strong> <br />{trail.terrain}</div>
                <div className="card-text"><strong>Current Conditions </strong><br /><div style={{ fontSize: "14px", fontStyle: "italic" }}>as of {formatDate}:</div>{trail.currentCondition}</div>
                <div className="card-text"><strong>Traffic Levels: </strong> <br />{trail.trafficLevels}</div>
                <div className="card-text"><strong>Available Water Sources: </strong> <br />{trail.waterSources}</div>
                {props.loggedIn &&
                  <div style={{ marginTop: "6px", textAlign: "center" }}><button className="trail-selected-button" onClick={event => { event.preventDefault(); setUpdateForm(true) }}>Update Trail</button></div>}
              </Card>
            </Col>
          </Row>
        </Container>
        {updateForm &&
          <div style={{ zIndex: "999" }} className="trailsubmission-form">
            <form>
              <div className="trailsubmission-form-item">
                <label>Elevation Ascent (in feet)</label>
                <input name="ascent" onChange={handleInputChange}></input>
              </div>
              <div className="trailsubmission-form-item">
                <label>Elevation Descent (in feet)</label>
                <input name="decent" onChange={handleInputChange}></input>
              </div>
              <div className="trailsubmission-form-item">
                <label>Trail Type</label>
                <Select name="type" onChange={handleInputChange}>
                  <option value="A to B">A to B</option>
                  <option value="Loop">Loop</option>
                  <option value="Out 'n Back">Out 'n Back</option>
                </Select>
              </div>
              <div className="trailsubmission-form-item">
                <label>Terrain</label>
                <input name="terrain" onChange={handleInputChange}></input>
              </div>
              <div className="trailsubmission-form-item">
                <label>Current Condition</label>
                <input name="condition" onChange={handleInputChange} placeholder="Well maintained, fallen trees, etc." />
              </div>
              <div className="trailsubmission-form-item">
                <label>Duration (in minutes)</label>
                <input name="duration" onChange={handleInputChange}></input>
              </div>
              <div className="trailsubmission-form-item">
                <label>Traffic Levels</label>
                <input name="traffic" onChange={handleInputChange}></input>
              </div>
              <div className="trailsubmission-form-item">
                <label>Water Sources</label>
                <input name="waterSources" onChange={handleInputChange}></input>
              </div>

              <button className="trail-selected-button" onClick={handleSubmit}>Submit Updates</button>
            </form>
          </div>
        }
      </div>
    </div>
  );
}


export default Detail;
