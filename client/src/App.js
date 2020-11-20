import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginForm from './pages/Auth/LoginForm';
// import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Info from "./components/Info";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Trails from './pages/Trails';
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import '../src/reset.css';
import '../src/styles.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout} />
          <div className="main-view">
            <Switch>
              <Route exact path="/" component={Trails} />
              <Route exact path="/trails" component={Trails} />
              <Route exact path="/trails/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div>

          <header>
            <Nav />
            <LoginModal />
            <Banner />
            <Info />
          </header>

          <Main />
          <Footer />

          {/* <Route exact path="/" component={() => <LoginForm login={login}/>} />
          <Route exact path="/trails" component={() => <LoginForm user={login} />} />
          <Route exact path="/signup" component={SignupForm} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
