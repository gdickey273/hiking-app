import React, { Fragment } from "react";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import FavoritesModal from "../FavoritesModal";
import './Nav.css';

function Nav(props) {
  let greeting;

  if (props.user === null) {
    greeting = <p className="site-greeting">Hello, guest</p>
  } else if (props.user.firstName) {
    greeting = (
      <Fragment>
        <p className="site-greeting"> Welcome back, <strong>{props.user.firstName}</strong></p>
      </Fragment>
    )
  } else if (props.user.username) {
    greeting = (
      <Fragment>
        <p className="site-greeting">Welcome back, <strong>{props.user.username} </strong></p>
      </Fragment>
    )
  }
  return (
    <div className="nav">
      <h1>TRAILSHARE</h1>

      <div className="account">
        {props.user &&
          <ol>
            <FavoritesModal renderTrailById={props.renderTrailById} user={props.user} favsUpdated={props.favsUpdated}/>
            <button className="logout-button" onClick={props.logout}>Logout</button>
          </ol>
        }
        {!props.user &&
          <ol>
            <LoginModal login={props.login} />
            <RegisterModal />
          </ol>
        }
      </div>

      <div className="social">
        {greeting}
        <i className="fab fa-instagram-square"></i>
        <i className="fab fa-twitter-square"></i>
        <i className="fab fa-facebook-square"></i>
      </div>
    </div >
  )
};

export default Nav;
