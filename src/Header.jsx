import React from "react";
import "./Header.css";
import altLogo from "./img/altcoinn.svg";
import chart from "./img/chart.svg";
import btcline from "./img/btcline.svg";
import redline from "./img/redline.svg";
import greenline from "./img/greenline.svg";

import "./Faq.css";

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
      </div>

      <div className="quick-market">
        {/* <img src={altLogo} alt="" /> */}
        <div className="header-coin-1">
          <div className="header-coin-content">
            <div className="header-coin-content-cont">
              <h4 className="coin-name">BTC</h4>
              <img className="coin-chart" alt="" />
            </div>
            <div className="header-coin-content-cont">
              <p className="coin-price">$32,650</p>
              <p className="coin-percent">+23%</p>
            </div>
          </div>
        </div>

        <div className="header-coin-2">
          <div className="header-coin-content">
            <div className="header-coin-content-cont">
              <h4 className="coin-name">ETH</h4>
              <img className="coin-chart" alt="" />
            </div>
            <div className="header-coin-content-cont">
              <p className="coin-price">$1,650</p>
              <p className="coin-percent">-50%</p>
            </div>
          </div>
        </div>

        <div className="header-coin-3">
          <div className="header-coin-content">
            <div className="header-coin-content-cont">
              <h4 className="coin-name">VET</h4>
              <img className="coin-chart" alt="" />
            </div>
            <div className="header-coin-content-cont">
              <p className="coin-price">$653</p>
              <p className="coin-percent">+5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
