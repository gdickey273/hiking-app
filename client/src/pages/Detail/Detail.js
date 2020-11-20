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
  console.log(id);

  useEffect(() => {
    API.getTrail(id)
      .then(res => 
        console.log(res.data)
        // setTrail(res.data.trail)
        )
      .catch(err => console.log(err));
  }, [id]);

  const MapLoader = withScriptjs(UserTrailsMap);
  return (
    <Container fluid>
      <Row>
        <Col size="md-2">
          <div className="mt-3"><Link to="/">←</Link>Home</div>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title={trail.name}>
          </Card>
        </Col>
      </Row>
      {/* {trail.destination ? */}
        <MapLoader
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-wvyWjrqtg7umKsrvrJU19WrcSanUV7c"
          loadingElement={<div style={{ height: `100%` }} />}
          origin={trail.origin}
          destination={trail.destination}
          waypoints={trail.waypoints}
        />
        {/* :
        <APITrailsMa
        name={trail.name}
        />
      } */}
    </Container>
  );
}


export default Detail;
