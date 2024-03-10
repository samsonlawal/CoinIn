import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import altLogo from "./img/altcoinn.svg";
import supabase from "./config/supabaseClient";
// import Portfolio from "./Portfolio.jsx";

function Navbar({ updatePortfolio, token, setToken }) {
  let navigate = useNavigate();

  function portfolioLinkHandler() {
    updatePortfolio((prevState) => !prevState);
  }

  const [modal, setModal] = useState(false);

  function modalHandler() {
    setModal((prevState) => !prevState);
    console.log(modal);
  }
  let handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    setToken(false);
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav>
        <img className="altLogo" src={altLogo} alt="" />
        <h3 className="logo">
          Coin<span>In</span>
        </h3>

        <ul className="links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/market">Market</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio">Portfolio</NavLink>
          </li>
          {/* <li>
            <NavLink to="/trade">Trade</NavLink>
          </li> */}
        </ul>

        <ul className="page-features">
          {/* <i className="fa-solid fa-user"></i> */}

          {token ? (
            <li className="login" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <>
              <li className="login">
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li className="signup">
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
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
