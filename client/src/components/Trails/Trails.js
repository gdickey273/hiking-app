import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";
import { Input, Select, FormBtn } from "../Form";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Trails(props) {
  // Setting our component's initial state
  const [trails, setTrails] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [searchStarted, setSearchStarted] = useState(false);
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

    let trailsToFilter = trails;
    if (name === "name") {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
      setTrails(filteredTrails)
      if (value === "") {
        loadTrails();
        setSearchStarted(false);
      } else {
        setSearchStarted(true);
      }
    }
    if (name === "city") {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
      setTrails(filteredTrails)
      if (value === "") {
        loadTrails();
        setSearchStarted(false);
      } else {
        setSearchStarted(true);
      }
    }

    if (name === "rating" || name === "length") {
      setFormObject({
        ...formObject,
        [name]: value
      })
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject === {}) {
      loadTrails();
    }

    let trailsToFilter = trails;
    if(formObject.rating && formObject.length) {
      const ratedTrails = trailsToFilter.filter(trail => { return trail.rating > formObject.rating });
      const filteredTrails = ratedTrails.filter(trail => { return trail.length < formObject.length });
      setTrails(filteredTrails)
      setSearchStarted(true);
    } else if (formObject.rating) {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.rating > formObject.rating });
      setTrails(filteredTrails)
      setSearchStarted(true);
    } else if (formObject.length) {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.length < formObject.length });
      setTrails(filteredTrails)
      setSearchStarted(true);
    }
    formEl.current.reset();
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Card name="Let's find your next adventure!">
            <form ref={formEl}>
              <Input
                onChange={handleInputChange}
                name="name"
                placeholder="Search by trail name"
              />
              <Input
                onChange={handleInputChange}
                name="city"
                placeholder="Search by city"
              />
              <Select name="rating" onChange={handleInputChange}>
                <option value="rating">Rating</option>
                <option value="2">(insert star icon) 2</option>
                <option value="3"> 3</option>
                <option value="4"> 4</option>
              </Select>
              <Select name="length" onChange={handleInputChange}>
                <option value="length">Length</option>
                <option value="3">(insert less than icon) 3</option>
                <option value="5"> 5</option>
                <option value="10"> 10</option>
                <option value="15"> 15</option>
              </Select>
              <FormBtn onClick={handleFormSubmit}>
                Search
              </FormBtn>
            </form>
          </Card>
        </Col>
        {searchStarted ? (
            <Col size="md-6 sm-12">
              <Card>
                {trails.length ? (
                  <List>
                    {trails.map(trail => (
                      <ListItem key={trail._id}>
                        <a onClick={() => props.renderTrailById(trail._id)}>
                          <strong>
                            {trail.name}/{trail.city}/{trail.length}mi./{trail.rating}stars
                        </strong>
                        </a>
                        {/* <DeleteBtn onClick={() => deleteTrail(trail._id)} /> */}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                    <h3>No Results to Display</h3>
                  )}
              </Card>
            </Col>
          ) 
          : 
          (<h3>No Results to Display</h3>)
        }
      </Row>
    </Container>
  );
}


export default Trails;
