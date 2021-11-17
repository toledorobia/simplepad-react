import React from "react";
import { useSelector, } from "react-redux";

import { signOut, } from "../backend/auth";

const Navbar = () => {
  console.log("Navbar");

  const user = useSelector((state) => state.auth.user);
  const saved = useSelector((state) => state.notepad.notepads != null && state.notepad.notepads.find((n) => !n.saved) == null);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top shadow">
      <div className="container-fluid">
        <a className="navbar-brand"
          href="!#">Simplepad</a>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"
          id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {saved && <span className="badge rounded-pill bg-success"><i className="bi bi-cloud-check-fill"></i></span>}
              {!saved && <span className="badge rounded-pill bg-secondary"><i className="bi bi-cloud-fill"></i></span>}
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"
                href="!#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">{user.email}</a>
              <ul className="dropdown-menu shadow"
                aria-labelledby="navbarDropdown">
                <li><button className="dropdown-item"
                  onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
