import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import altLogo from "./img/altcoinn.svg";
// import Portfolio from "./Portfolio.jsx";

function Navbar({ updatePortfolio }) {
  function portfolioLinkHandler() {
    updatePortfolio((prevState) => !prevState);
  }

  const [modal, setModal] = useState(false);

  function modalHandler() {
    setModal((prevState) => !prevState);
    console.log(modal);
  }

  return (
    <>
      <nav>
        <img className="altLogo" src={altLogo} alt="" />
        <h3 className="logo">
          Coin<span>In</span>
        </h3>

        <ul className="links">
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              to="/market"
            >
              Market
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              to="/portfolio"
            >
              Portfolio
            </NavLink>
          </li>
          <li>Trade</li>
        </ul>

        <ul className="page-features">
          {/* <li><i class="fa-solid fa-user"></i></li> */}
          <li className="login">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="signup">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <a href="#" className="gear" onClick={modalHandler}>
            <i className="fa-solid fa-gear"></i>
            <ul className={`dropdown ${modal ? "display" : ""}`}>
              <div className="lang">
                <p>Language</p>
                <p>Eng</p>
                {/* <i className="fa-solid fa-angle-down nav-arrow"></i> */}
              </div>
              <div className="mode">
                <p>Drak Mode</p>
                <p>obj</p>
              </div>
            </ul>
          </a>
          {/* <li>
          <i class="fa-brands fa-twitter"></i>
        </li> */}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
