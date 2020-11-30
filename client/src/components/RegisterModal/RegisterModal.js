import React, { useState } from "react";
import './RegisterModal.css';
import { Redirect, Link } from 'react-router-dom';
import AUTH from '../../utils/AUTH';

function RegisterModal() {

  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState)
  }

  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO - validate!
    AUTH.signup({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      username: userObject.username,
      password: userObject.password
    }).then(response => {
      // console.log(response);
      if (!response.data.errmsg) {
        setRedirectTo('/');
        setModalState(false);
      } else {
        console.log('duplicate');
      }
    });
  };

  return (
    <div className="RegisterModal">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
          <button style={{ float: "right" }} onClick={() => toggleModalState()}>x</button>
          <form>
            <label htmlFor="username">First name: </label>
            <input
              className="account-input"
              type="text"
              name="firstName"
              value={userObject.firstName}
              onChange={handleChange}
            />
            <label htmlFor="username">Last name: </label>
            <input
              className="account-input"
              type="text"
              name="lastName"
              value={userObject.lastName}
              onChange={handleChange}
            />
            <label htmlFor="username">Username: </label>
            <input
              className="account-input"
              type="text"
              name="username"
              value={userObject.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password: </label>
            <input
              className="account-input"
              type="password"
              name="password"
              value={userObject.password}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              className="account-input"
              type="password"
              name="confirmPassword"
              value={userObject.confirmPassword}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="account-input-button"
            >Register</button>
          </form>
        </div>
      </div>
      <button
        onClick={() => toggleModalState()}
        className="account-input-button"
      >Register</button>
    </div>
  )
}


export default RegisterModal;