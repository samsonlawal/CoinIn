import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import "./Faq.css";
import phone from "./img/phone.png";
// import wall from "./img/wall.png"
import { ChevronRight } from "react-feather";

function Header() {
  return (
    <div className="header">
      {/* <h1 className="heading">Latest & accurate crypto data</h1> */}
      <div className="header-text">
        <h1 className="heading">
          {" "}
          <span>Real-time</span> Crypto Market Data
        </h1>

        <p className="sub-heading">
          Track, Manage and Monitor your Assets Effectively for Profitable
          Decisions.
        </p>
        <button className="get_started">
          <NavLink className="header-link" to="/portfolio">
            Get Started
          </NavLink>
        </button>
      </div>

      {/* {headerTop && } */}

      <div className="quick-market">
        <img src={phone} alt="" />
      </div>
    </div>
  );
}

export default Header;
