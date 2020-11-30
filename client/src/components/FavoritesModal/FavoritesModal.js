import React, { useEffect, useState } from "react";
import './FavoritesModal.css';
import API from "../../utils/API";

import { Col } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";

function FavoritesModal(props) {
  const [favs, setFavs] = useState([])

  const user = props.user;

  const [modalState, setModalState] = useState(false);

  const toggleLoginState = () => {
    setModalState(!modalState)
  }

  useEffect(() => {
    API.getFavorites(user._id)
      .then(res =>
        {
        console.log(res.data)
        setFavs(res.data.favorites)
        })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="FavoritesModal">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
          <button style={{float: "right"}} onClick={() => toggleLoginState()}>x</button>
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
                  <h3>You haven't saved any favorite trails yet!</h3>
                )}
            </Card>
          </Col>
        </div>
      </div>
      <button
        onClick={() => toggleLoginState()}
        className="account-input-button"
      >My Trails</button>
    </div>
  );
}

export default FavoritesModal;