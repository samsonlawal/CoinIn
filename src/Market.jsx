import { React, useState, useEffect, Suspense } from "react";
import "./Market.css";
import Charts from "react-apexcharts";
import Header from "./Header";
import Navbar from "./Navbar";
import supabase from "./config/supabaseClient";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function Market({ getBookmarkHandler, token }) {
  // State that gets the datas from the database
  const [bookmarks, setBookmarks] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // State for bookmarked coin and sending data to the database
  const [bookmarked, setBookmarked] = useState("");

  // State for Marketdata
  const [market, setMarket] = useState([]);

  // Top gainer and losers state
  const [top, setTop] = useState({
    Coins: [],
    Gainers: [],
    Losers: [],
    // Trending: [],
  });

  // State for switching market data
  const [link, setLink] = useState({
    coin: true,
    gainer: false,
    loser: false,
    // trending: false,
    currentData: "All Cryptocurrencies",
  });

  // Get the bookmarks from the database
  useEffect(() => {
    const userId = token && token.user.id; // Get user ID
    console.log(userId);

    const fetchId = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        setFetchError("Couldn't fetch");
        setBookmarks(null);
        console.log(error);
      }

      if (data) {
        setBookmarks(data);
        getBookmarkHandler(data);
        // console.log(data);
        setFetchError(null);
      }
    };

    fetchId();
  }, [bookmarked]);

  // Update graphs in header
  const [headerTop, setHeaderTop] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // const [options, setOption] = useState({
  //   chart: {
  //     type: "line",
  //     toolbar: false, // Hide toolbar
  //     animations: {
  //       enabled: false,
  //     },
  //   },

  //   noData: {
  //     text: "Loading...",
  //     align: "center",
  //     verticalAlign: "middle",
  //     offsetX: 0,
  //     offsetY: 0,
  //     style: {
  //       color: "#000000",
  //       fontSize: "14px",
  //       fontFamily: "Helvetica",
  //     },
  //   },

  //   series: [
  //     {
  //       name: "Prices",
  //       data: [],
  //     },
  //   ],
  //   // colors: [],

  //   plotOptions: {
  //     series: {
  //       marker: {
  //         enabled: false, // Disable markers (points) on the line
  //       },

  //       hover: {
  //         size: 0, // Set the size of the hover effect to 0 to disable it
  //       },
  //     },
  //   },
  //   stroke: {
  //     width: 1, // Set the width of the line here
  //   },
  //   xaxis: {
  //     labels: {
  //       show: false, // Hide X-axis labels
  //     },
  //     axisBorder: {
  //       show: false, // Hide X-axis border
  //     },
  //     axisTicks: {
  //       show: false, // Hide X-axis ticks
  //     },
  //   },
  //   fill: {
  //     type: ["solid"],
  //   },

  //   yaxis: {
  //     show: false,
  //     labels: {
  //       show: false, // Hide Y-axis labels
  //     },
  //     axisBorder: {
  //       show: false, // Hide Y-axis border
  //     },
  //     axisTicks: {
  //       show: false, // Hide Y-axis ticks
  //     },
  //     tooltip: {
  //       enabled: false,
  //     },
  //   },
  //   grid: {
  //     show: false, // Hide grid lines
  //   },
  //   tooltip: {
  //     enabled: false,
  //   },
  // });

  // Bookmark function
  const BookmarkHandler = async (itemId) => {
    // const { user } = supabase.auth.getUser(); // Get current user

    const userId = token && token.user.id; // Get user ID
    console.log(userId);

    // Change bookmark value for clicked coin
    setMarket((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, bookmarked: !item.bookmarked }
          : { ...item }
      )
    );

    setBookmarked({ ...bookmarked, itemId });

    console.log(token);

    const isCoinAlreadyBookmarked =
      bookmarks && bookmarks.some((bookmark) => bookmark.coinId === itemId);

    if (token) {
      if (!isCoinAlreadyBookmarked) {
        // Adding coin to database
        try {
          const { data, error, status } = await supabase
            .from("bookmarks")
            .insert([{ coinId: itemId, user_id: userId }]);
          // .select();

          console.log("Supabase Response:", { data, error, status });
          toast.success("Bookmark Successful!");

          if (data) {
            console.log("Data inserted successfully:", data);
            fetchId();
            toast.success("Bookmark Successful!");
          }

          if (error) {
            console.log("Supabase Response:", { data, error, status });
            toast.error("Bookmark Unsuccessful!");
          }
        } catch (error) {
          console.log("Error inserting data:", error.message);
        }
      }

      // If Item is already bookmarked
      else {
        try {
          const { data, error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("coinId", itemId);

          if (data) {
            console.log("Bookmark removed successfully:", data);
            // console.log(market);
          }
          //   console.log("Error removing bookmark:", error);

          // if (error) {
          // }
        } catch (error) {
          console.log("Error removing bookmark:", error);
        }
      }
    } else {
      toast.warning("You're notlogged in");
    }
  };

  // console.log(bookmarks);
  // console.log(market);

  // MARKET API endpoint, key and keywords
  const apiKEY = "CG-9JnDkY6yxZsiy7xoXzsyqfLw";
  const usd = "usd";
  const pageNo = 1;
  const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=40&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  // Top Gainers API  const gainer = "percent_change_percentage_24h";
  const topGainers = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=100&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  useEffect(() => {
    // Fetchig Process all market data

    fetch(apiURL)
      .then((response) => response.json())

      .then((data) => {
        setMarket(
          data.map((item) => ({
            ...item,
            bookmarked: false,
          }))
        );

        // console.log(data.slice(0, 3));
      });

    // *************FETCH GAINERS AND LOSERS*************
    fetch(topGainers)
      .then((response) => response.json())
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
        // updateData(data.slice(0, 50));
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

  function HandleTrending() {
    setMarket(top.Losers);
    setLink({
      coin: false,
      gainer: false,
      loser: false,
      currentData: "Trending",
    });
    setIsLoading((prevLoading) => !prevLoading);
  }

  function HandleMarket() {
    fetch(apiURL)
      .then((response) => response.json())

      .then((data) => {
        setMarket(data);
        // console.log(data);
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

  // Timer delay for the line graph
  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 10000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, []);

  // console.log(market);

  const marketData =
    market &&
    market.map((item) => {
      const lineColor =
        item.sparkline_in_7d.price.slice(-1)[0] > item.sparkline_in_7d.price[0]
          ? "#27ca4e"
          : "#ff3a33";

      // console.log(item.sparkline_in_7d.price.length);

      // const renderChart = (
      //   <Charts
      //     height="60%"
      //     id="charts"
      //     options={{ ...options, colors: [lineColor] }}
      //     series={[
      //       {
      //         name: "history",
      //         data: item.sparkline_in_7d.price,
      //       },
      //     ]}
      //     type="line"
      //     width="150"
      //   />
      // );

      return (
        <tr key={item.symbol} id={item.id}>
          <td className="saveButton">
            <i
              className={`fa-star ${
                item.bookmarked ? "fa-solid" : "fa-regular"
              } ${
                bookmarks && bookmarks.some((obj) => obj.coinId === item.id)
                  ? "fa-solid"
                  : "fa-regular"
              }  `}
              // className={`fa-star ${
              //   bookmarks && bookmarks.some((obj) => obj.coinId === item.id)
              //     ? "fa-solid"
              //     : "fa-regular"
              // }`}
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
            {/* {isLoading ? <p>Loading...</p> : renderChart} */}
            ...
          </td>
        </tr>
      );
    });

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
          {/* <button
            onClick={HandleTrending}
            className={link.trending ? trueStyle : falseStyle}
            // className={link.coin ? "active" : ""}
          >
            Trending
          </button> */}
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

        <div>
          {fetchError && <p>{fetchError}</p>}
          {bookmarks && (
            <div>
              {bookmarks.map((bookmark) => {
                <p>{bookmark.coinId}</p>;
              })}
            </div>
          )}
        </div>
      </div>

      <div></div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="dark"
        // transition:Bounce
      />
    </div>
  );
}

export default Market;
