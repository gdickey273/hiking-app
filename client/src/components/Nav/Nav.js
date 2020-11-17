import React from "react";
// import { Link } from 'react-router-dom';
// import { Col } from '../Grid';
import './Nav.css';

// const Nav = (props) => {
//   let greeting;

//   if (props.user === null) {
// 		greeting = <p>Hello guest</p>
// 	} else if (props.user.firstName) {
// 		greeting = (
// 			<Fragment>
// 				Welcome back, <strong>{props.user.firstName}</strong>
// 			</Fragment>
// 		)
// 	} else if (props.user.username) {
// 		greeting = (
// 			<Fragment>
// 				Welcome back, <strong>{props.user.username} </strong>
// 			</Fragment>
// 		)
//   }

function Nav(){
  return (
    <div className="nav">
      <h1>TRAILSHARE</h1>

      <div className="account">
        <ol>
          <li>sign in</li>
          <li>register</li>
        </ol>
      </div>

      <div className="social">
        <i className="fab fa-instagram-square"></i>
        <i className="fab fa-twitter-square"></i>
        <i className="fab fa-facebook-square"></i>
      </div>
    </div>
  )
};

export default Nav;
