import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import API from "../../utils/API";

function Detail(props) {
  const [trail, setTrail] = useState({})

  // When this component mounts, grab the trail with the _id of props.match.params.id
  // e.g. localhost:3000/trails/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    API.getTrail(id)
      .then(res => setTrail(res.data.trail))
      .catch(err => console.log(err));
  }, [id]);

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
      </Container>
    );
  }


export default Detail;
