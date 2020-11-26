import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";

import { Col } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";

function Favorites(props) {
  const [favs, setFavs] = useState([])

  useEffect(() => {
    AUTH.getUser()
      .then(response =>
        // console.log(response.data.user._id))
        API.getFavorites(response.data.user._id))
      .then(res =>
        // console.log(res.data.favorites))
        setFavs(res.data.favorites))
      .catch(err => console.log(err));
  }, []);

  return (
    <Col size="md-6 sm-12">
      <Card name="Your Favorites">
        {favs?.length ? (
          <List>
            {favs.map(fav => (
              <ListItem key={fav._id}>
                <a onClick={() => props.renderTrailById(fav._id)}>
                  <strong>
                    {fav.name}/{fav.city}/{fav.length}mi./{fav.rating}stars
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
  );
}

export default Favorites;