// import { useContext } from "react";

const Navbar = (props) => {
  return <>
    <nav className="navbar navbar-dark bg-sp navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Simplepad</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">jtoledo@outlook.cl</a>
              <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">New Simplepad</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
};

export default Navbar;
