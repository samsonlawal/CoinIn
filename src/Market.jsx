import { React, useState, useEffect } from "react";
import "./Market.css";
import Charts from "react-apexcharts";

import Chart from "./Chart";
// import ApexCharts from "apexcharts";

function Market() {
  // State for Marketdata
  const [market, setMarket] = useState([]);
  const [top, setTop] = useState({
    Coins: [],
    Gainers: [],
    Losers: [],
  });
  const [link, setLink] = useState({
    coin: true,
    gainer: false,
    loser: false,
    currentData: "All Cryptocurrencies",
  });

  const [options, setOption] = useState({
    chart: {
      // color: "#27ca4e",
      type: "line",
      toolbar: false, // Hide toolba
      animations: {
        enabled: false,
      },
      fill: {},
    },

    series: [
      {
        name: "Prices",
        data: [],
      },
    ],
    colors: ["#27ca4e"],

    plotOptions: {
      series: {
        marker: {
          enabled: false, // Disable markers (points) on the line
        },

        hover: {
          size: 0, // Set the size of the hover effect to 0 to disable it
        },
      },
    },
    stroke: {
      width: 1, // Set the width of the line here
    },
    xaxis: {
      labels: {
        show: false, // Hide X-axis labels
      },
      axisBorder: {
        show: false, // Hide X-axis border
      },
      axisTicks: {
        show: false, // Hide X-axis ticks
      },
    },
    fill: {
      type: ["solid"],
    },

    yaxis: {
      show: false,
      labels: {
        show: false, // Hide Y-axis labels
      },
      axisBorder: {
        show: false, // Hide Y-axis border
      },
      axisTicks: {
        show: false, // Hide Y-axis ticks
      },
      tooltip: {
        enabled: false,
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    tooltip: {
      enabled: false,
    },
  });

  const [bookmark, setBookmark] = useState(false);

  // const BookmarkHandler = (item) => {
  //   // setBookmark((prevBookmark) => !prevBookmark);

  //   const index = market.findIndex(
  //     (marketItem) => marketItem.symbol === item.symbol
  //   );

  //   if (index !== -1) {
  //     const updatedMarket = [...market];
  //     updatedMarket[index] = {
  //       ...updatedMarket[index],
  //       bookmarked: !updatedMarket[index].bookmarked,
  //     };
  //     setMarket(updatedMarket);
  //   }

  //   console.log(market.item.symbol);
  // };

  // MARKET API endpoint, key and keywords
  const apiKEY = "CG-9JnDkY6yxZsiy7xoXzsyqfLw";
  const usd = "usd";
  const pageNo = 1;
  const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=10&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  // Top Gainers API
  const gainer = "percent_change_percentage_24h";
  const topGainers = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=100&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

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
        setMarket(data);
      });
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  }, []);

  useEffect(() => {
    fetch(topGainers)
      .then((response) => response.json())
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      // Parse the JSON response
      // return response.json();
      .then((data) => {
        // Handle the data returned by the API

        // Sort coins by percentage change
        const sortedCoins = data.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );

        // Get top gainers and losers
        console.log(sortedCoins);
        const topGainers = sortedCoins.slice(0, 10);
        const topLosers = sortedCoins.slice(-10).reverse();

        setTop({
          ...top,
          Gainers: topGainers,
          Losers: topLosers,
        });
        console.log("Top Losers:", topLosers);

        // console.log(data);

        // setTop({
        //   Gainers: data,
        //   ...top,
        // });
      });
  }, []);

  function logData() {
    // console.log(top.Gainers);
  }

  function HandleGainer() {
    setMarket(top.Gainers);

    setLink({
      coin: false,
      gainer: true,
      loser: false,
      currentData: "Top Gainers",
    });
  }

  function HandleLoser() {
    setMarket(top.Losers);
    setLink({
      coin: false,
      gainer: false,
      loser: true,
      currentData: "Top Losers",
    });
  }

  function HandleMarket() {
    fetch(apiURL)
      .then((response) => response.json())
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      // Parse the JSON response
      // return response.json();
      .then((data) => {
        setMarket(data);
        // setTop({
        //   Coins: data,
        // });
        setLink({
          coin: true,
          gainer: false,
          loser: false,
          currentData: "All Cryptocurrencies",
        });
      });
  }

  const trueStyle = "active";

  const falseStyle = "";

  // const currentPrice = item.sparkline_in_7d.price.length - 1;
  // const lastPrice = item.sparkline_in_7d.price[0];

  const marketData =
    market &&
    market.map((item) => {
      const lineColor = () => {
        if (item.sparkline_in_7d.price(-1)[0] > item.sparkline_in_7d.price[0]) {
          console.log("#ff3a33");
        } else {
          console.log("#27ca4e");
        }
        lineColor();
      };
      // item.sparkline_in_7d.price.slice(-1)[0] > item.sparkline_in_7d.price[0]
      //   ? "#27ca4e"
      //   : "#ff3a33";

      return (
        <tr key={item.symbol}>
          <td className="saveButton">
            <i
              className={`fa-star ${bookmark ? "fa-solid" : "fa-regular"}`}
              onClick={(item) => BookmarkHandler(item)}
            ></i>
          </td>
          <td className="orders">
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
          <td className="cap">
            <p>${item.market_cap.toLocaleString()}</p>
          </td>
          <td className="days">
            <Charts
              height="60%"
              id="charts"
              options={options}
              series={[
                {
                  name: "history",
                  data: item.sparkline_in_7d.price,
                },
              ]}
              type="line"
              width="150"
              // colors="#ff3a33"
            />
          </td>
        </tr>
      );
    });

  // const percentageChange =
  //   ((currentPrice - price7DaysAgo) / price7DaysAgo) * 100;

  // ********************JSX CODE*************************************

  return (
    <div className="table-div">
      <div className="market-text">
        <h3>Cryptocurrency Prices by Market Cap</h3>
        <p>
          The global cryptocurrency market cap today is $1.36 Trillion, a 3.2%
          change in the last 24 hours. <br />
          Total cryptocurrency trading volume in the last day is at $86.5
          Billion. Bitcoin dominance is at 50.9% and Ethereum dominance is at
          16.3%.
        </p>
      </div>

      <div className="linkers">
        <div className="top-shelf">
          <button
            onClick={HandleMarket}
            className={link.coin ? trueStyle : falseStyle}
            // className={link.coin ? "active" : ""}
          >
            Cryptocurrencies
          </button>
          <button
            onClick={HandleGainer}
            className={link.gainer ? trueStyle : falseStyle}
            // className={link.coin ? "active" : ""}
          >
            Gainers
          </button>
          <button
            onClick={HandleLoser}
            className={link.loser ? trueStyle : falseStyle}
            // className={link.coin ? "active" : ""}
          >
            Losers
          </button>
        </div>
      </div>

      <div className="table-shelf">
        <table>
          <thead>
            <tr>
              <th className="save">*</th>
              <th className="order">#</th>
              <th className="name">Coin</th>
              <th className="price">Price</th>
              <th className="vol">24h</th>
              <th className="cap">Market Cap</th>
              <th className="days">7 days</th>
            </tr>
          </thead>
          <tbody>{marketData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Market;
