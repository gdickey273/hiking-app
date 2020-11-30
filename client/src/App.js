import React, { useState, useEffect } from 'react';

import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Main from "./components/Main";
import Footer from "./components/Footer";
import AUTH from './utils/AUTH';
import '../src/reset.css';
import '../src/styles.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [trailId, setTrailId] = useState(null);

  useEffect(() => {
    AUTH.getUser().then(response => {
      // console.log(response.data);
      if (!!response.data.user) {
        setLoggedIn(true);
        setUser(response.data.user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    });

    return () => {
      setLoggedIn(false);
      setUser(null);
    };
  }, []);

  const logout = (event) => {
    event.preventDefault();

    AUTH.logout().then(response => {
      // console.log(response.data);
      if (response.status === 200) {
        setLoggedIn(false);
        setUser(null);
      }
    });
  };

  const login = (username, password) => {
    AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
  };

  function renderTrailById(id) {
    setTrailId(id)
  }

  return (
    <div className="app">
      <header>
        <Nav 
        renderTrailById={renderTrailById}
        login={login}
        logout={logout}
        loggedIn={loggedIn}
        user={user}
        />
        <Banner renderTrailById={renderTrailById} />
        {/* <Info /> */}
      </header>
      <Main trailId={trailId} />
      <Footer trailId={trailId} />
    </div>
  );
}

export default App;
