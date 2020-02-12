import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ userExists, logOut }) => {
  console.log(userExists)
  return (
    <nav>
      {userExists ? <Link to="/" onClick={logOut}> Logout</Link> : null}
    </nav>
  );
};

export default NavBar;
