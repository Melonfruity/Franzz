import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    setUserExists(window.localStorage.getItem('authorization'));
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    setUserExists(!window.localStorage);
  };

  // TODO: Reloading channel should bring back to channel
  return (
    <div>
      <Router>
        <NavBar logOut={logOut} userExists={userExists} />
        <Route
          exact
          path="/"
          render={() => (
            userExists
              ? <Redirect to="/home" />
              : <Landing setUserExists={setUserExists} />
          )}
        />
        <Route
          exact
          path="/home"
          render={() => (
            userExists
              ? <Home userExists={userExists} setUserExists={setUserExists} />
              : <Redirect to="/" />
          )}
        />
        <Route
          path="/channel"
          render={() => (
            userExists
              ? <Home userExists={userExists} setUserExists={setUserExists} />
              : <Redirect to="/" />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
