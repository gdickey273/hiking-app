import React, { useEffect, useState, useRef } from "react";

import { Col, Row, Container } from "../Grid";
import { Card } from "../Card";
import UserTrailsMap from "../UserTrailsMap";
import APITrailsMap from "../APITrailsMap";
import UserPolylineMap from "../UserPolylineMap";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import { withScriptjs } from "react-google-maps";
import extAPI from "../../utils/extAPI";
import { Select, Input } from "../Form";
import StockPhoto from "./stock-trail.jpg";

function Detail(props) {
  const [trail, setTrail] = useState({})
  const [user, setUser] = useState({})
  const [url, setUrl] = useState({})
  const [formObject, setFormObject] = useState({});
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
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

    AUTH.getUser()
      .then(res =>
        // console.log(res.data.user._id)
        setUser(res.data.user)
      )
      .catch(err => console.log(err));
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (value === "rating" || value === "") {
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
    API.addFavorite(user._id, id)
      .then(response =>
        console.log(response.data))
      .catch(err => console.log(err));
  }

  function uploadImage(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', formObject.photos);

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
                  <Input
                    name='photos'
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={handleInputChange} />
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
                </form>
              }

              <h6 className="card-subtitle mb-2 text-muted">{trail.city}, {trail.state}</h6>
              {props.loggedIn &&
                <p className="card-text">Verified by {trail.userVerified} users <button name="userVerified" onClick={handleVerify}><i className="fas fa-check"></i></button></p>}
              {!props.loggedIn &&
                <p className="card-text">Verified by {trail.userVerified} users <i className="fas fa-check"></i></p>}
              <p className="card-text"><strong>Rating: </strong>{trail.rating}</p>
              {props.loggedIn && <form ref={formEl}>
                <Select name="rating" onChange={handleInputChange}>
                  <option value="rating">Rate this Trail</option>
                  <option value="1">(insert star icon) 1</option>
                  <option value="2">(insert star icon) 2</option>
                  <option value="3"> 3</option>
                  <option value="4"> 4</option>
                  <option value="5"> 5</option>
                </Select>
              </form>}

              <p className="card-text"><strong>Length: </strong>{trail.length} miles</p>
              <p className="card-text"><strong>Elevation: </strong>+{trail.elevation}</p>
              <p className="card-text"><strong>Estimated duration: </strong>{trail.duration}</p>
              <p className="card-text"><strong>Trail Type: </strong>{trail.trailType}</p>
              <p className="card-text"><strong>Terrain: </strong>{trail.terrain}</p>
              <p className="card-text"><strong>Current Conditions (as of {formatDate}): {trail.currentCondition}</strong></p>
              <p className="card-text"><strong>Traffic Levels: </strong>{trail.trafficLevels}</p>
              <p className="card-text"><strong>Available Water Sources: </strong>{trail.waterSources}</p>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
}


export default Detail;
