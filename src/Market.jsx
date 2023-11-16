import { React, useState, useEffect } from "react";
import "./Market.css";
import btcline from "./img/btcline.svg";
import btclogo from "./img/btclogo.webp";
import eth from "./img/eth.webp";

function Market() {
  // State for Marketdata
  const [market, setMarket] = useState([]);

  // API endpoint, key and keywords
  const apiKEY = "CG-9JnDkY6yxZsiy7xoXzsyqfLw";
  const usd = "usd";
  const pageNo = 1;
  const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=10&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  useEffect(() => {
    // Fetchig Process

    fetch(apiURL)
      .then((response) => response.json())
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      // Parse the JSON response
      // return response.json();
      .then((data) => {
        // Handle the data returned by the API
        setMarket(data);
      });
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  }, []);

  function logData() {
    console.log(market);
  }

  return (
    <div className="table-div">
      <div className="top-shelf">
        <section>Coin</section>
        <section>Gainers and Losers</section>
        <section>New Coin</section>
      </div>
      <div className="market-text">
        <h3>Cryptocurrency Prices by Market Cap</h3>
        <p>
          The global cryptocurrency market cap today is $1.36 Trillion, a 3.2%
          change in the last 24 hours. <br />
          Total cryptocurrency trading volume in the last day is at $86.5
          Billion. Bitcoin dominance is at 50.9% and Ethereum dominance is at
          16.3%.
        </p>
        <button onClick={logData}>Log</button>
      </div>
      <div className="table-shelf">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="name">Coin</th>
              <th className="price">Price</th>
              <th className="vol">24h</th>
              <th className="cap">Market Cap</th>
              <th className="days">7 days</th>
            </tr>
          </thead>
          <tbody>
            {market &&
              market.map((item) => (
                <tr>
                  <td>
                    <p>{item.market_cap_rank}</p>
                  </td>
                  <td className="name">
                    <img src={item.image} alt="" />
                    <p>
                      {item.name} <span>{item.symbol.toUpperCase()}</span>
                    </p>
                  </td>
                  <td className="price">
                    <p>${item.current_price.toLocaleString()}</p>
                  </td>
                  <td className="vol">
                    <p
                      className={
                        item.price_change_percentage_24h >= 0 ? "green" : "red"
                      }
                    >
                      {item.price_change_percentage_24h.toFixed(1)}%
                    </p>
                  </td>
                  <td className="days">
                    <p>${item.market_cap.toLocaleString()}</p>
                  </td>
                  <td>
                    <img src={item.line} alt="" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Market;
