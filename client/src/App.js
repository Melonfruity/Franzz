import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem('authorization'));
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setLoggedIn(!loggedIn);
  };

  const title = 'JEK';
  return (
    <div>
      {title}
      <Router>
        <Route exact path="/" render={() => (loggedIn ? <Redirect to="/home" /> : <Landing setLoggedIn={setLoggedIn} />)} />
        <Route exact path="/home" render={() => (loggedIn ? <Home logOut={logOut} /> : <Redirect to="/" />)} />
        <Route path="/channel" render={() => (loggedIn ? <Home logOut={logOut} /> : <Redirect to="/" />)} />
      </Router>
    </div>
  );
};

export default App;
