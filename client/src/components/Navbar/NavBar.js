import React from 'react';
import { Link } from 'react-router-dom';
import GuestRegisterBanner from './GuestRegisterBanner';

const NavBar = ({ state, setState, logOut }) => ((
  <div>
    <nav className="navLogout">
      <div className="username">
        {state.username && <i className="fas fa-user-circle" />}
        <span className="usernameText">{state.username}</span>
      </div>
      {state.guest === 'true' ? <GuestRegisterBanner setState={setState} /> : null}
      {state.authorization ? <Link className="logoutButton" to="/" onClick={logOut}> Logout </Link> : null}
    </nav>
  </div>
));

export default NavBar;
