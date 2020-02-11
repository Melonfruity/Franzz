import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home';
import ImageBox from './components/Channel/Container/Photos/photoDisplay';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import DragAndDrop from './components/Channel/Container/Photos/DragAndDrop';

// Hooks
import useToggleButton from './hooks/useToggleButton';

const ON = 'on';

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
  const { boxDisplay, clickedButton } = useToggleButton('off');

  return (
    <div>
      {title}
      <PopUpButton toggleButton={clickedButton} />
      <DragAndDrop />
      {/* { boxDisplay === ON && <PopUpBox />} */}
      { boxDisplay === ON && <ImageBox />}
      <Router>
        <Route exact path="/" render={() => (loggedIn ? <Redirect to="/home" /> : <Landing setLoggedIn={setLoggedIn} />)} />
        <Route exact path="/home" render={() => (loggedIn ? <Home logOut={logOut} /> : <Redirect to="/" />)} />
        <Route path="/channel" render={() => (loggedIn ? <Home logOut={logOut} /> : <Redirect to="/" />)} />
      </Router>
    </div>
  );
};

export default App;
