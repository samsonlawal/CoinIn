import React from "react";
import { useState } from "react";
import "./TopCoins.css";

function TopCoins({ headerTop }) {
  const [topData, setTopData] = useState(headerTop);

  return (
    <marquee behavior="alternate">
      <div className="coin">
        {headerTop &&
          headerTop.map((item) => {
            return (
              <div className="header-coin-1" key={item.symbol}>
                <div className="header-coin-content">
                  <div className="header-coin-content-cont">
                    <img src={item.image} alt="" />

                    <p className="coin-name">{item.symbol.toUpperCase()} </p>
                    {/* <img className="coin-chart" alt="" /> */}
                  </div>
                  <div className="header-coin-content-cont2">
                    <p className="coin-price">
                      ${item.current_price.toLocaleString()}
                    </p>
                    <p
                      className={`coin-percent 
                  ${item.price_change_percentage_24h > 0 ? "green" : "red"}
                `}
                    >
                      {item.price_change_percentage_24h.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        {/* <div className="header-coin-2">
        <div className="header-coin-content">
          <div className="header-coin-content-cont">
            <h4 className="coin-name">
              {headerTop ? `${headerTop[1].symbol.toUpperCase()}` : "..."}
            </h4>
            <img className="coin-chart" alt="" />
          </div>
          <div className="header-coin-content-cont">
            <p className="coin-price">
              {headerTop
                ? `$${headerTop[1].current_price.toLocaleString()}`
                : "..."}
            </p>
            <p
              className={`coin-percent 
                  ${
                    headerTop && headerTop[1].price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                `}
            >
              {headerTop
                ? `${headerTop[1].price_change_percentage_24h.toFixed(1)}%`
                : "..."}
            </p>
          </div>
        </div>
      </div>

      <div className="header-coin-3">
        <div className="header-coin-content">
          <div className="header-coin-content-cont">
            <h4 className="coin-name">
              {headerTop ? `${headerTop[2].symbol.toUpperCase()}` : "..."}
            </h4>
            <img className="coin-chart" alt="" />
          </div>
          <div className="header-coin-content-cont">
            <p className="coin-price">
              {headerTop
                ? `$${headerTop[2].current_price.toLocaleString()}`
                : "..."}
            </p>
            <p
              className={`coin-percent 
                  ${
                    headerTop && headerTop[2].price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                `}
            >
              {headerTop
                ? `${headerTop[2].price_change_percentage_24h.toFixed(1)}%`
                : "..."}
            </p>
          </div>
        </div>
      </div>

      <div className="header-coin-1">
        <div className="header-coin-content">
          <div className="header-coin-content-cont">
            <h4 className="coin-name">
              {headerTop ? `${headerTop[3].symbol.toUpperCase()}` : "..."}
            </h4>
            <img className="coin-chart" alt="" />
          </div>
          <div className="header-coin-content-cont">
            <p className="coin-price">
              {headerTop
                ? `$${headerTop[3].current_price.toLocaleString()}`
                : "..."}
            </p>
            <p
              className={`coin-percent 
                  ${
                    headerTop && headerTop[3].price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                `}
            >
              {headerTop
                ? `${
                    headerTop &&
                    headerTop[3].price_change_percentage_24h.toFixed(1)
                  }%`
                : "..."}
            </p>
          </div>
        </div>
      </div>

      <div className="header-coin-2">
        <div className="header-coin-content">
          <div className="header-coin-content-cont">
            <h4 className="coin-name">
              {headerTop ? `${headerTop[0].symbol.toUpperCase()}` : "..."}
            </h4>
            <img className="coin-chart" alt="" />
          </div>
          <div className="header-coin-content-cont">
            <p className="coin-price">
              {headerTop
                ? `$${headerTop[1].current_price.toLocaleString()}`
                : "..."}
            </p>
            <p
              className={`coin-percent 
                  ${
                    headerTop && headerTop[1].price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                `}
            >
              {headerTop
                ? `${headerTop[1].price_change_percentage_24h.toFixed(1)}%`
                : "..."}
            </p>
          </div>
        </div>
      </div>

      <div className="header-coin-3">
        <div className="header-coin-content">
          <div className="header-coin-content-cont">
            <h4 className="coin-name">
              {headerTop ? `${headerTop[2].symbol.toUpperCase()}` : "..."}
            </h4>
            <img className="coin-chart" alt="" />
          </div>
          <div className="header-coin-content-cont">
            <p className="coin-price">
              {headerTop
                ? `$${headerTop[2].current_price.toLocaleString()}`
                : "..."}
            </p>
            <p
              className={`coin-percent 
                  ${
                    headerTop && headerTop[2].price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                `}
            >
              {headerTop
                ? `${headerTop[2].price_change_percentage_24h.toFixed(1)}%`
                : "..."}
            </p>
          </div>
        </div>
      </div> */}
      </div>
    </marquee>
  );
}

export default TopCoins;
