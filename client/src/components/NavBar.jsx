// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h1>Nav Bar</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/lists">Lists</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
