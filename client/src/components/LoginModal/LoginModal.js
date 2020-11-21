import React, {useState} from "react";
import './LoginModal.css';
// import { Redirect, Link } from 'react-router-dom';

function LoginModal({login}) {

  const [modalState, setModalState] = useState(false);

  const toggleLoginState = () => {
    setModalState(!modalState)
  }

  // if (props.user === null) {
	// 	greeting = "Login"
	// } else if (props.user.firstName) {
	// 	greeting = (
	// 		<Fragment>
	// 			Welcome back, {props.user.firstName}
	// 		</Fragment>
	// 	)
	// } else if (props.user.username) {
	// 	greeting = (
	// 		<Fragment>
	// 			Welcome back, {props.user.username}
	// 		</Fragment>
	// 	)
  // }

  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
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
		login(userObject.username, userObject.password);
		setRedirectTo('/');
	};

  return(
    <div className="LoginModal">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
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
            className="account-input-button"
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