import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="div-footer">
      <div className="footer-div">
        <h2>CoinIn</h2>
        <p>We provide you with up to date crypto data and news</p>
      </div>

      <div className="footer-flex">
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

      <p>© 2024 CoinIn. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
