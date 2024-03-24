import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          Surwayers
        </Link>
      </div>

      <div className="navbar__right">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/about" className="navbar__link">
          About us
        </Link>
        <Link to="/admin/gbJnVFkiDIhhihyNyshn" className="navbar__link">
          Dashboard
        </Link>
        <Link to="/survey/create" >
        <button className="navbar__button">Create Survey</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
