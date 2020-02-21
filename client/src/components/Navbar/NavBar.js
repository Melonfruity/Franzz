import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import GuestRegisterBanner from './GuestRegisterBanner'

const NavBar = ({ state, logOut, setState }) => {
  return ((
    <div>
    <nav className="navLogout">
      <div className="username">
      <p>{state.username}</p>
      </div>
      <h1>JEK</h1>
      {state.authorization ? <Link className="logoutButton" to="/" onClick={logOut}> Logout </Link> : null}
    </nav>
    <GuestRegisterBanner></GuestRegisterBanner>
    </div>
  ));
};

export default NavBar;