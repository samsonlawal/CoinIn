import "./Navbar.css";
import altLogo from "./img/altcoinn.svg";

function Navbar() {
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
      </ul>

      <ul className="page-features">
        <li className="lang">
          English
          <i className="fa-solid fa-angle-down nav-arrow"></i>
        </li>
        <li>
          {/* USD <i class="fa-solid fa-angle-down"></i> */}
          {/* <i class="fa-brands fa-twitter"></i> */}
        </li>
        {/* <li>
          <i class="fa-brands fa-twitter"></i>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
