import React from "react";
import { Link } from "react-router-dom";


const NavbarPage = () => {
  const guestLinks = (
      <Link to="logout/">
        <Link to="logout/" className="btn signOut">Sign out</Link>
      </Link>
  );
  return (
    <nav className="navbar bg-white">
      <h3 className="titleName">
        <Link to="/">
          <i className="fas fa-pen" /> Employees
        </Link>
      </h3>
      {guestLinks}
    </nav>
  );
};

export default NavbarPage;