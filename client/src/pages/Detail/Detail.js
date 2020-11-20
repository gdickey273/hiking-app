import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import UserTrailsMap from "../../components/UserTrailsMap";
import APITrailsMap from "../../components/APITrailsMap";
import API from "../../utils/API";
import { withScriptjs } from "react-google-maps";

function Detail(props) {
  const [trail, setTrail] = useState({})

  // When this component mounts, grab the trail with the _id of props.match.params.id
  // e.g. localhost:3000/trails/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    API.getTrail(id)
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));
  }, [id]);

  const date = new Date(trail.date);
  const formatDate = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;

  const MapLoader = withScriptjs(UserTrailsMap);
  return (
    <div>
      <Container fluid>
        <Row>
          <Col size="md-2">
            <div className="mt-3"><Link to="/">←</Link>Home</div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card
              name={trail.name}
            >
              <img class="card-img-top" src={trail.photos} alt="Card image cap"></img>
              <h6 class="card-subtitle mb-2 text-muted">{trail.city}, {trail.state}</h6><p class="card-text">Verified: {trail.userVerified}</p>
              <p class="card-text">Length: {trail.length} miles</p>
              <p class="card-text">Elevation: +{trail.elevation}</p>
              <p class="card-text">Estimated duration: {trail.duration}</p>
              <p class="card-text">Trail Type: {trail.trailType}</p>
              <p class="card-text">Terrain: {trail.terrain}</p>
              <p class="card-text">User Comments: {trail.comments}</p>
              <p class="card-text">Current Conditions (as of {formatDate}): {trail.currentCondition}</p>
              <p class="card-text">Traffic Levels: {trail.trafficLevels}</p>
              <p class="card-text">Available Water Sources: {trail.waterSources}</p>
            </Card>
          </Col>
        </Row>
      </Container>
      {
        trail.destination &&
        <MapLoader
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
          loadingElement={<div style={{ height: `100%` }} />}
          origin={trail.origin}
          destination={trail.destination}
          waypoints={trail.waypoints}
        />
      }
      {!trail.destination &&
        <APITrailsMap
          name={trail.name}
        />
      }

    </div>
  );
}


export default Detail;
