import { React, useState, useEffect, Suspense } from "react";
import "./Market.css";
import Charts from "react-apexcharts";
import Header from "./Header";

function Market({ updateData }) {
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

  // STate for bookmarked coin
  const [bookmarked, setBookmarked] = useState([]);

  // const [isChartLoaded, setChartLoaded] = useState(true);

  // const [headerTop, setHeaderTop] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [options, setOption] = useState({
    chart: {
      // color: "#27ca4e",
      type: "line",
      toolbar: false, // Hide toolba
      animations: {
        enabled: false,
      },
    },

    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#000000",
        fontSize: "14px",
        fontFamily: "Helvetica",
      },
    },

    series: [
      {
        name: "Prices",
        data: [],
      },
    ],
    // colors: [],

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

  // const [bookmark, setBookmark] = useState(false);

  const BookmarkHandler = (itemId) => {
    // setBookmark((prevBookmark) => !prevBookmark);

    // const index = market.findIndex(
    //   (marketItem) => marketItem.symbol === item.symbol
    // );

    // if (index !== -1) {
    //   const updatedMarket = [...market];
    //   updatedMarket[index] = {
    //     ...updatedMarket[index],
    //     bookmarked: !updatedMarket[index].bookmarked,
    //   };
    // setMarket(updatedMarket);
    // const newItem = market[index];
    // setBookmarked([...bookmarked, newItem]);
    // console.log(item);

    setMarket((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  useEffect(() => {
    console.log(bookmarked);
  }, [bookmarked]);

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
        console.log(
          setMarket(
            data.map((item) => ({
              ...item,
              bookmarked: false,
            }))
          )
        );
        updateData(data.slice(0, 3));
        // console.log(data.slice(0, 3));
      });
    // .catch((error) => {
    //   console.error("Error:", error);
    // });

    // *************FETCH GAINERS AND LOSERS*************
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
        const topGainers = sortedCoins.slice(0, 10);
        const topLosers = sortedCoins.slice(-10).reverse();

        setTop({
          ...top,
          Gainers: topGainers,
          Losers: topLosers,
        });
      });
  }, []);

  function HandleGainer() {
    setMarket(top.Gainers);

    setLink({
      coin: false,
      gainer: true,
      loser: false,
      currentData: "Top Gainers",
    });
    setIsLoading((prevLoading) => !prevLoading);
  }

  function HandleLoser() {
    setMarket(top.Losers);
    setLink({
      coin: false,
      gainer: false,
      loser: true,
      currentData: "Top Losers",
    });
    setIsLoading((prevLoading) => !prevLoading);
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

    setIsLoading((prevLoading) => !prevLoading);
  }

  const trueStyle = "active";

  const falseStyle = "";

  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 10000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, []);

  const marketData =
    market &&
    market.map((item) => {
      const lineColor =
        item.sparkline_in_7d.price.slice(-1)[0] > item.sparkline_in_7d.price[0]
          ? "#27ca4e"
          : "#ff3a33";

      const renderChart = (
        <Charts
          height="60%"
          id="charts"
          options={{ ...options, colors: [lineColor] }}
          series={[
            {
              name: "history",
              data: item.sparkline_in_7d.price,
            },
          ]}
          type="line"
          width="150"
        />
      );

      return (
        <tr key={item.symbol} id={item.id}>
          <td className="saveButton">
            <i
              className={`fa-star ${
                item.bookmarked ? "fa-solid" : "fa-regular"
              }`}
              onClick={() => BookmarkHandler(item.id)}
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
            {/* {!isChartLoaded && <p>Loading...</p>} */}
            {/* {isChartLoaded ? renderChart() : <p>Loading...</p>} */}
            {isLoading ? <p>Loading...</p> : renderChart}
            {/* {renderChart} */}
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

{
  /* <div className="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>; */
}
