import React, { useEffect, useState } from "react";
import './FavoritesModal.css';
import API from "../../utils/API";
import DeleteBtn from "../DeleteBtn";

function FavoritesModal(props) {
  const [favs, setFavs] = useState(null);
  const [updateFavs, setUpdateFavs] = useState(true);

  const user = props.user;

  const [modalState, setModalState] = useState(false);

  const toggleLoginState = () => {
    setModalState(!modalState)
  }

  useEffect(() => {
    API.getFavorites(user._id)
      .then(res =>
        {
        setFavs(res.data.favorites);
        })
      .catch(err => console.log(err));
  }, [updateFavs, modalState]);

  // Deletes a trails from the database with a given id, then reloads trails from the db
  function deleteTrail(id) {
    API.deleteTrail(id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      setUpdateFavs(!updateFavs);
  }

  return (
    <div className="FavoritesModal">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
          <button style={{float: "right"}} onClick={() => toggleLoginState()}>x</button>
          <h2>Your Trails</h2>
          {favs ? (
                <div>
                  {favs.map(fav => (
                    <div key={fav._id}>
                      <a onClick={() => props.renderTrailById(fav._id)}>
                        <strong>
                          {fav.name} - {fav.city}
                        </strong>
                      </a>
                      {fav.user_id === user._id && <DeleteBtn text="Delete" onClick={() => deleteTrail(fav._id)} />}
                    </div>
                  ))}
                </div>
              ) : (
                  <h3>You haven't saved any favorite trails yet!</h3>
                )}
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