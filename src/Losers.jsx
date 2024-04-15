import { React, useState, useEffect, Suspense } from "react";
import "./Market.css";
import Charts from "react-apexcharts";
import supabase from "./config/supabaseClient";

import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import { DataContext } from "./DataContext";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ChevronLeft, ChevronRight } from "react-feather";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Losers({ updateCheckerState, dataChecker }) {
  // Context
  const { clicked, setClicked, getBookmarkHandler, token } =
    useContext(DataContext);

  // State that gets the datas from the database
  const [bookmarks, setBookmarks] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // State for bookmarked coin and sending data to the database
  const [bookmarked, setBookmarked] = useState("");

  // State for Marketdata
  const [coin, setCoin] = useState([]);

  const [market, setMarket] = useState([]);

  const [pageNo, setPageNo] = useState(1);

  const [ApiChecker, setApiChecker] = useState(true);

  const navigate = useNavigate();

  // Top gainer and losers state
  const [top, setTop] = useState({
    // Coins: [],
    Gainers: [],
    Losers: [],
  });

  // State for switching market data
  //   const [link, setLink] = useState({
  //     coin: true,
  //     gainer: false,
  //     loser: false,
  //     // trending: false,
  //     currentData: "All Cryptocurrencies",
  //   });

  // Get the bookmarks from the database
  useEffect(() => {
    const userId = token && token.user.id; // Get user ID
    // console.log(userId);

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

  const [options, setOption] = useState({
    chart: {
      type: "line",
      toolbar: false, // Hide toolbar
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

  // Bookmark function
  const BookmarkHandler = async (itemId) => {
    // const { user } = supabase.auth.getUser(); // Get current user

    const userId = token && token.user.id; // Get user ID
    // console.log(userId);

    // Change bookmark value for clicked coin
    setMarket((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, bookmarked: !item.bookmarked }
          : { ...item }
      )
    );

    setBookmarked({ ...bookmarked, itemId });
    // console.log(token);

    // Adding bookmarks, checking bookmarks
    const isCoinAlreadyBookmarked =
      bookmarks && bookmarks.some((bookmark) => bookmark.coinId === itemId);

    if (token) {
      if (!isCoinAlreadyBookmarked) {
        // Adding coin to database
        try {
          const { data, error, status } = await supabase
            .from("bookmarks")
            .insert([{ coinId: itemId, user_id: userId }]);

          // console.log("Supabase Response:", { data, error, status });
          toast.success("Bookmark Successful!");

          if (data) {
            // console.log("Data inserted successfully:", data);
            fetchId();
            toast.success("Bookmark Successful!");
          }

          if (error) {
            // console.log("Supabase Response:", { data, error, status });
            toast.error("Bookmark Unsuccessful!");
          }
        } catch (error) {
          // console.log("Error inserting data:", error.message);
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
            toast.success("Bookmark removed successfully");
            // console.log(market);
          }
        } catch (error) {
          toast.log("Error removing bookmark");
        }
      }
    } else {
      toast.warning("You're not logged in");
    }
  };

  // MARKET API endpoint, key and keywords
  const apiKEY = "CG-9JnDkY6yxZsiy7xoXzsyqfLw";
  const usd = "usd";

  // let pageNo = 1;
  //   const perPage = 100;
  // const itemsPerPageToShow = 10;

  //   const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=100&page=1&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  // Top Gainers API  const gainer = "percent_change_percentage_24h";
  const topGainers = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=200&page=1&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  useEffect(() => {
    // Fetchig Process Top data

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
        // const topGainers = sortedCoins.slice(0, 10);
        const topLosers = sortedCoins.slice(-10).reverse();

        setTop({
          ...top,
          //   Gainers: topGainers,
          Losers: topLosers,
        });
        // updateData(data.slice(0, 50));
        updateCheckerState();
        // setDataChecker(false);
      });
    // console.log(coin);
  }, []);

  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 5000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  function clickHandler(id) {
    console.log(id);
    setClicked(id);
    // window.scrollTo(0, 0); // Scrolls to the top left corner of the page
    // setCoinData(id);

    if (clicked) {
      navigate(`/coin/${id}`);
    }
  }

  const marketData =
    top.Losers &&
    top.Losers.map((item) => {
      const lineColor =
        item.sparkline_in_7d.price.slice(-1)[0] > item.sparkline_in_7d.price[0]
          ? "#27ca4e"
          : "#ff3a33";
      // updateCheckerState();

      // console.log(item.sparkline_in_7d.price.length);

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
        <tr
          key={item.symbol}
          id={item.id}
          onClick={() => {
            clickHandler(item.id);
          }}
        >
          <td className="saveButton">
            <i
              className={`fa-star ${
                item.bookmarked ? "fa-solid" : "fa-regular"
              } ${
                bookmarks && bookmarks.some((obj) => obj.coinId === item.id)
                  ? "fa-solid"
                  : "fa-regular"
              }  `}
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
            {isLoading ? (
              <p>
                <Skeleton />
              </p>
            ) : (
              renderChart
            )}
          </td>
        </tr>
      );
    });

  // ********************JSX CODE*************************************

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="market-div">
        <div className="table-div">
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
              <tbody>
                {!dataChecker
                  ? [...Array(5)].map((_, index) => (
                      <tr>
                        <td className="saveButton-skeleton">
                          {/* <i className={`fa-star`}> */}
                          <Skeleton />
                          {/* </i> */}
                        </td>

                        <td className="orders-skeleton">
                          <Skeleton />
                        </td>

                        <td className="name-skeleton">
                          <Skeleton />
                        </td>
                        <td className="price">
                          <Skeleton />
                        </td>
                        <td className="vol">
                          <Skeleton />
                        </td>
                        <td className="cap">
                          <Skeleton />
                        </td>
                        <td className="days">
                          <Skeleton />
                        </td>
                      </tr>
                    ))
                  : marketData}
              </tbody>
            </table>

            {fetchError && <p>{fetchError}</p>}
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
      </div>
    </SkeletonTheme>
  );
}

export default Losers;
