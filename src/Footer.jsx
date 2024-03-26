import React from "react";
import "./Footer.css";
import altLogo from "./img/altcoinn.svg";

function Footer() {
  return (
    <div className="div-footer">
      <div className="footer-flex">
        <div className="footer-div">
          <div className="footer-logo-div">
            <img className="footer-altLogo" src={altLogo} alt="" />
            <h3 className="footer-logo">
              Coin<span>In</span>
            </h3>
          </div>
          <p>
            We provide you with up to date crypto data. In addition to tracking
            price, volume and market capitalisation, CoinIn tracks community
            growth s
          </p>
        </div>

        <div className="comm">
          <h4>Community</h4>
          <p>Discord</p>
          <p>Instagram</p>
          <p>Reddit</p>
          <p>X/Twitter</p>
        </div>

        <div className="support">
          <h4>Support</h4>
          <p>Help Center</p>
          <p>FAQ</p>
        </div>
      </div>

      <div className="copy">
        <p>© 2024 CoinIn. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
