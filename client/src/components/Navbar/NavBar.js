import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';

const NavBar = ({ state, logOut, setState }) => {
  return ((
    <nav className="navLogout">
      {state.username}
      {state.guest === 'true' ? <div> </div> : null}
      {state.guest === 'true' ? <Register setState={setState} /> : null}
      {state.authorization ? <Link className="logoutButton" to="/" onClick={logOut}> Logout </Link> : null}
    </nav>
  ));
};

export default NavBar;
