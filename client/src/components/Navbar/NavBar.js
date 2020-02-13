import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';

const NavBar = ({ state, logOut, setState }) => {
  return ((
    <nav>
      {state.authorization ? <Link to="/" onClick={logOut}> Logout </Link> : null}
      {state.username}
      {state.guest === 'true' ? <div> click here to register </div> : null}
      {state.guest === 'true' ? <Register setState={setState} /> : null}
    </nav>
  ));
};

export default NavBar;
