import React, { useEffect, useState, useRef } from "react";

import { Col, Row, Container } from "../Grid";
import { Card } from "../Card";
import UserTrailsMap from "../UserTrailsMap";
import APITrailsMap from "../APITrailsMap";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import { withScriptjs } from "react-google-maps";
import extAPI from "../../utils/extAPI";
import { TextArea, Select, FormBtn, Input } from "../Form";
import { ListItem } from "../List";
import DropZone from "../DropZone";

function Detail(props) {
  const [trail, setTrail] = useState({})
  const [user, setUser] = useState({})
  const [url, setUrl] = useState({})
  const [formObject, setFormObject] = useState({});
  const [fileSelected, setFileSelected] = useState(false);
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

    extAPI.getGoogleKey()
      .then(res =>
        setUrl(`https://maps.googleapis.com/maps/api/js?key=${res.data}`))
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

    if (name === "comments") {
      setFormObject({
        ...formObject,
        [name]: value
      })
    }

    if (name === 'photos') {
      setFileSelected(true)
      setFormObject({
        ...formObject,
        [name]: event.target.files[0]
      })
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject === {}) {
      return false;
    }

    if (formObject.comments) {
      let commentsArr = trail.comments;
      commentsArr.push({
        comment: formObject.comments,
        userName: `${user.firstName} ${user.lastName}`,
        userID: user._id
      });

      API.updateTrail(id, { ...trail, comments: commentsArr })
        .then(res => {
          // console.log(res.data)
          formEl.current.reset();
          setTrail(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  function handleVerify() {
    API.updateTrail(id, { ...trail, userVerified: trail.userVerified + 1 })
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));
  }

  function addFavorite(event) {
    event.preventDefault();
    console.log(user, id)
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

        console.log(photos);

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
    <div className="trail-selected-container">
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Card
              name={trail.name}
            >
              <button style={{float: 'right'}} onClick={() => addFavorite()}><i className="fas fa-star"></i></button>
              {trail.photos && trail.photos.map((photo, i) => (
                <img key={i} className="card-img-top" src={photo} alt="Card image cap"></img>
              ))}
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
              </form>
              {/* <DropZone uploadImage={uploadImage} /> */}
              <h6 className="card-subtitle mb-2 text-muted">{trail.city}, {trail.state}</h6>
              <p className="card-text">Verified: {trail.userVerified} <button name="userVerified" onClick={handleVerify}><i className="fas fa-check"></i></button></p>
              <p className="card-text">Rating: {trail.rating}</p>
              <form ref={formEl}>
                <Select name="rating" onChange={handleInputChange}>
                  <option value="rating">Rate this Trail</option>
                  <option value="1">(insert star icon) 1</option>
                  <option value="2">(insert star icon) 2</option>
                  <option value="3"> 3</option>
                  <option value="4"> 4</option>
                  <option value="5"> 5</option>
                </Select>
              </form>

              <p className="card-text">Length: {trail.length} miles</p>
              <p className="card-text">Elevation: +{trail.elevation}</p>
              <p className="card-text">Estimated duration: {trail.duration}</p>
              <p className="card-text">Trail Type: {trail.trailType}</p>
              <p className="card-text">Terrain: {trail.terrain}</p>
              <p className="card-text">User Comments: {trail.comments && trail.comments.map((comment, i) => (
                <ListItem key={i}>{comment.comment} - {comment.userName}</ListItem>
              ))}</p>
              <form ref={formEl}>
                <TextArea
                  onChange={handleInputChange}
                  name="comments"
                  placeholder="Add Comments"
                />
                <FormBtn
                  onClick={handleFormSubmit}
                >
                  Submit
                </FormBtn>
              </form>

              <p className="card-text">Current Conditions (as of {formatDate}): {trail.currentCondition}</p>
              <p className="card-text">Traffic Levels: {trail.trafficLevels}</p>
              <p className="card-text">Available Water Sources: {trail.waterSources}</p>
            </Card>
          </Col>
        </Row>
      </Container>
      {
        trail.destination ?
          <MapLoader
            googleMapURL={url}
            loadingElement={<div style={{ height: `100%` }} />}
            originLat={trail.originLat}
            originLng={trail.originLng}
            destination={trail.destination}
            waypoints={trail.waypoints}
          />
          :
          <APITrailsMap
            name={trail.name}
            originLat={trail.originLat}
            originLng={trail.originLng}
          />
      }
    </div>
  );
}


export default Detail;
