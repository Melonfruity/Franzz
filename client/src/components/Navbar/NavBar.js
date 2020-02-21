import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import GuestRegisterBanner from './GuestRegisterBanner'

const NavBar = ({ state, logOut, setState }) => {
  return ((
    <div>
    <nav className="navLogout">
      <div className="username">
        {state.username && <i class="fas fa-user-circle"></i>}
        <p>{state.username}</p>
      </div>
      {state.authorization ? <Link className="logoutButton" to="/" onClick={logOut}> Logout </Link> : null}
    </nav>
    {state.guest === 'true' ? <GuestRegisterBanner setState={setState}/> : null}
    </div>
  ));
};

export default NavBar;