import React from 'react';
import { Link } from 'react-router-dom';
import GuestRegisterBanner from './GuestRegisterBanner';

const NavBar = ({ state, logOut, setState }) => ((
  <div>
    <nav className="navLogout">
      <div className="username">
        {state.username && <i className="fas fa-user-circle" />}
        <p>Temporary</p>
        {/* <p style={{marginLeft: '5px'}}>{state.username.length < 20 ? state.username : state.username.slice(0,20) + "..."}</p> */}
      </div>
      {state.authorization ? <Link className="logoutButton" to="/" onClick={logOut}> Logout </Link> : null}
    </nav>
    {state.guest === 'true' ? <GuestRegisterBanner setState={setState} /> : null}
  </div>
));

export default NavBar;
