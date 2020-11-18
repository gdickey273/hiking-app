import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Trails() {
  // Setting our component's initial state
  const [trails, setTrails] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all trails and store them with setTrails
  useEffect(() => {
    loadTrails();
  }, []);

  // Loads all trails and sets them to trails
  function loadTrails() {
    API.getTrails()
      .then(res => {
        // console.log(res.data.trails);
        setTrails(res.data.trails);
      })
      .catch(err => console.log(err));
  };

  // Deletes a trails from the database with a given id, then reloads trails from the db
  // function deleteTrail(id) {
  //   API.deleteTrail(id)
  //     .then(res => loadTrails())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveTrail method to save the trail data
  // Then reload trails from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    API.saveTrail({
      // need object data here
    })
      .then(res => {
        formEl.current.reset();
        loadTrails();
      })
      .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Card title="Let's find your next adventure!">
            <form ref={formEl}>
              <Input
                onChange={handleInputChange}
                name="search"
                placeholder="Search by trail name or location"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Search
                </FormBtn>
            </form>
          </Card>
        </Col>
        <Col size="md-6 sm-12">
          <Card title="Trails">
            {trails.length ? (
              <List>
                {trails.map(trail => (
                  <ListItem key={trail._id}>
                    <Link to={"/trails/" + trail._id}>
                      <strong>
                        {trail.name}
                      </strong>
                    </Link>
                    {/* <DeleteBtn onClick={() => deleteTrail(trail._id)} /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


export default Trails;
