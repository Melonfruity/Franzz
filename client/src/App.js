import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  // useParams,
} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';

const App = () => {
  // state of the client app
  const [state, setState] = useState({
    guest: true,
    currentChannel: '',
    authorization: '',
    username: '',
    channelStates: {},
    locations: {},
  });

  // logout resets app
  const logOut = () => {
    window.localStorage.clear();
    setState({
      guest: true,
      currentChannel: '',
      authorization: '',
      username: '',
      channelStates: {},
      locations: {},
    });
  };

  useEffect(() => {
    // load the data if the user was already logged in
    setState((prev) => ({
      ...prev,
      authorization: window.localStorage.getItem('authorization'),
      username: window.localStorage.getItem('username'),
      guest: window.localStorage.getItem('guest'),
    }));
  }, []);

  // TODO: Reloading channel should bring back to channel
  return (
    <div>
      <Router>
        <NavBar
          logOut={logOut}
          state={state}
          setState={setState}
        />
        <Route
          exact
          path="/"
          render={() => (
            state.authorization
              ? <Redirect to="/home" />
              : (
                <Landing
                  setState={setState}
                />
              )
          )}
        />
        <Route
          exact
          path="/home"
          render={() => (
            state.authorization
              ? (
                <Home
                  state={state}
                  setState={setState}
                />
              )
              : <Redirect to="/" />
          )}
        />
        <Route
          path="/channel"
          render={() => (
            state.authorization
              ? (
                <Home
                  state={state}
                  setState={setState}
                />
              )
              : <Redirect to="/" />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
