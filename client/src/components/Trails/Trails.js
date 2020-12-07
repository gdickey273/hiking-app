import React, { useState, useEffect, useRef } from "react";

import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";
import { Input, Select } from "../Form";
import API from "../../utils/API";
import StockPhoto from "./stock-trail.jpg";

function Trails(props) {

  const [trails, setTrails] = useState([]);
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

    if (name === "rating") {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.rating > value });
      setTrails(filteredTrails)
      if (value === "rating") {
        loadTrails();
        setSearchStarted(false);
      } else {
        setSearchStarted(true);
      }
    } 
    
    if (name === "length") {
      const filteredTrails = trailsToFilter.filter(trail => { return trail.length < value });
      setTrails(filteredTrails)
      if (value === "length") {
        loadTrails();
        setSearchStarted(false);
      } else {
        setSearchStarted(true);
      }
    }

  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Card>
            <form ref={formEl}>
              <Input
                className="trail-search-input"
                onChange={handleInputChange}
                name="name"
                placeholder="Search by trail name"
              />
              <Input
                className="trail-search-input"
                onChange={handleInputChange}
                name="city"
                placeholder="Search by city"
              />
              <Select
                name="rating"
                onChange={handleInputChange}
              >
                <option value="rating">Rating</option>
                <option value="2">&gt; 2 stars</option>
                <option value="3">&gt; 3 stars</option>
                <option value="4">&gt; 3 stars</option>
              </Select>
              <Select
                name="length"
                onChange={handleInputChange}
              >
                <option value="length">Length</option>
                <option value="3">&lt; 3 mi</option>
                <option value="5">&lt; 5 mi</option>
                <option value="10">&lt; 10 mi</option>
                <option value="15">&lt; 15 mi</option>
              </Select>
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
                      <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => props.renderTrailById(trail._id)}>
                        {(trail.photos && trail.photos.length) ?
                          (<img className="photo-containers" src={trail.photos[0]} alt={trail.name} />)
                          :
                          (<img className="photo-containers" src={StockPhoto} alt="stock trail" />)
                        }

                      <div className="photo-container-details">
                        <p className="photo-container-details-title"><strong>{trail.name}</strong></p>
                        <p><strong>{trail.city}</strong></p>
                        <p><strong>{trail.length} mi.</strong></p>
                        <p><strong>{trail.rating} <i className="fas fa-star"></i> </strong></p>
                      </div>

                      </button>
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
          (<h3 className="no-results"></h3>)
        }
      </Row>
    </Container>
  );
}


export default Trails;
