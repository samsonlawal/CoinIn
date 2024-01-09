import React from "react";
import "./Header.css";
import "./Faq.css";
import { useState } from "react";

function Header({ headerTop }) {
  const [topData, setTopData] = useState(headerTop);
  console.log(topData);

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
              <p className="coin-price">
                {headerTop
                  ? `${headerTop[0].price_change_percentage_24h.toFixed(1)}%`
                  : "..."}
              </p>
              <p className="coin-percent">
                {headerTop
                  ? headerTop[0].current_price.toLocaleString()
                  : "..."}
              </p>
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
