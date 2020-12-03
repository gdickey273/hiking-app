import React, { useState } from "react";
import './LoginModal.css';

function LoginModal({ login }) {

  const [modalState, setModalState] = useState(false);

  const toggleLoginState = () => {
    setModalState(!modalState)
  }

  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userObject.username, userObject.password);
    setModalState(false);
  };

  return (
    <div className="LoginModal">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
        <button style={{float: "right"}} onClick={() => toggleLoginState()}>x</button>
          <form>
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
            <button
              onClick={handleSubmit}
              className="login-input-button"
            >Submit</button>
          </form>
        </div>
      </div>
      <button
        onClick={() => toggleLoginState()}
        className="account-input-button"
      >Login</button>
    </div>
  )
}


export default LoginModal;
// export const toggleLoginState;