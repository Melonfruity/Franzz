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
    currentUser: '',
    currentChannel: '',
    authorization: '',
    username: '',
    channelStates: {},
    locations: {},
    center: {},
    users: {},
    videoStates: {}, //{url, paused, played, timestamp}
    loaded: false,
    currentChannelLoaded: false,
    newChannelForm: false,
  });

  // logout resets app
  const logOut = () => {
    window.localStorage.clear();
    setState({
      guest: true,
      currentUser: '',
      currentChannel: '',
      authorization: '',
      username: '',
      channelStates: {},
      locations: {},
      center: {},
      users: {},
    });
  };

  useEffect(() => {
    // load the data if the user was already logged in
    setState((prev) => ({
      ...prev,
      authorization: window.localStorage.getItem('authorization'),
      username: window.localStorage.getItem('username'),
      guest: window.localStorage.getItem('guest'),
      currentUser: window.localStorage.getItem('userID'),
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
        {console.log(state)}

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
          from="/home"
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
              : <Redirect from="/" />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
