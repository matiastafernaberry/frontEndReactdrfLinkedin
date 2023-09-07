import React from "react";
import { Link } from "react-router-dom";


const NavbarPage = () => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/about">
          <Link className="btn signOut">Sign out</Link>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-white">
      <h3 className="titleName">
        <Link to="/">
          <i className="fas fa-pen" /> demo
        </Link>
      </h3>
      {guestLinks}
    </nav>
  );
};

export default NavbarPage;