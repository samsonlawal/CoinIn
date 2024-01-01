import { useState } from "react";
import "./Navbar.css";
import altLogo from "./img/altcoinn.svg";

function Navbar() {
  const [modal, setModal] = useState(false);

  function modalHandler() {
    setModal((prevState) => !prevState);
    console.log(modal);
  }

  return (
    <nav>
      <img className="altLogo" src={altLogo} alt="" />
      <h3 className="logo">
        Coin<span>In</span>
      </h3>

      <ul className="links">
        <li>Home</li>
        <li>Market</li>
        <li>Portfolio</li>
        <li>Trade</li>
      </ul>

      <ul className="page-features">
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

        {/* <li><i class="fa-solid fa-user"></i></li> */}
        <li className="login">Login</li>
        <li className="signup">Sign Up</li>
        {/* <li>
          <i class="fa-brands fa-twitter"></i>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
