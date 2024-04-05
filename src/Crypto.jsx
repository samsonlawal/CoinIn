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
import { ChevronLeft, ChevronRight } from "react-feather";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Crypto({
  getBookmarkHandler,
  token,
  updateCheckerState,
  dataChecker,
  setDataChecker,
}) {
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

  // Top gainer and losers state
  const [top, setTop] = useState({
    Coins: [],
    Gainers: [],
    Losers: [],
    // Trending: [],
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
  const perPage = 100;
  // const itemsPerPageToShow = 10;

  const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=100&page=1&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  // Top Gainers API  const gainer = "percent_change_percentage_24h";
  const topGainers = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=200&page=1&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  useEffect(() => {
    // Fetchig Process all market data
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setMarket(
          data.slice(0, 10).map((item) => ({
            ...item,
            bookmarked: false,
          }))
        );
        updateCheckerState();
        // Set the 'coin' state
        setCoin(data);
        // setDataChecker(false);
      });
  }, []);

  // Timer delay for the line graph
  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 10000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  // Paginatioin
  function nextHandler() {
    setIsLoading(true);
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
      const startIndex = pageNo * 10;
      const endIndex = (pageNo + 1) * 10;
      setMarket(
        coin.slice(startIndex, endIndex).map((item) => ({
          ...item,
          bookmarked: false,
        }))
      );
    }
  }

  function prevHandler() {
    setIsLoading(true);
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      const startIndex = (pageNo - 2) * 10;
      const endIndex = (pageNo - 1) * 10;
      setMarket(
        coin.slice(startIndex, endIndex).map((item) => ({
          ...item,
          bookmarked: false,
        }))
      );
    } else {
      ("");
    }
  }

  function page1() {
    setPageNo(1);
    setMarket(
      coin.slice(0, 10).map((item) => ({
        ...item,
        bookmarked: false,
      }))
    );
  }

  function page2() {
    setPageNo(2);
    setMarket(
      coin.slice(11, 20).map((item) => ({
        ...item,
        bookmarked: false,
      }))
    );
  }

  function page3() {
    setPageNo(3);
    setMarket(
      coin.slice(21, 30).map((item) => ({
        ...item,
        bookmarked: false,
      }))
    );
  }

  function page4() {
    setPageNo(4);
    setMarket(
      coin.slice(31, 40).map((item) => ({
        ...item,
        bookmarked: false,
      }))
    );
  }

  function page5() {
    setPageNo(5);
    setMarket(
      coin.slice(41, 50).map((item) => ({
        ...item,
        bookmarked: false,
      }))
    );
  }

  function clickHandler(key) {
    console.log(key);
  }

  // console.log(market);

  const marketData =
    market &&
    market.map((item) => {
      const lineColor =
        item.sparkline_in_7d.price.slice(-1)[0] > item.sparkline_in_7d.price[0]
          ? "#27ca4e"
          : "#ff3a33";
      updateCheckerState();

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
        <tr key={item.symbol} id={item.id} onClick={clickHandler(item.id)}>
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
                {/* {console.log(dataChecker)} */}
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

            {/* <div>
            {bookmarks && (
              <div>
                {bookmarks.map((bookmark) => {
                  <p>{bookmark.coinId}</p>;
                })}
              </div>
            )}
          </div> */}
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
        {/* Pagination */}
        {ApiChecker ? (
          <div className="pagination">
            <p onClick={prevHandler}>
              <ChevronLeft size={13} />
            </p>
            {[...Array(5)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNo <= 5) {
                return (
                  <p
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={pageNo === pageNumber ? "page" : "notPage"}
                  >
                    {pageNumber}
                  </p>
                );
              } else if (pageNo >= 6 && pageNo <= 10) {
                return (
                  <p
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber + 5)}
                    className={pageNo === pageNumber + 5 ? "page" : "notPage"}
                  >
                    {pageNumber + 5}
                  </p>
                );
              }
              return null;
            })}
            <p onClick={nextHandler}>
              <ChevronRight size={13} />
            </p>
          </div>
        ) : (
          <div className="pagination ">
            <p onClick={prevHandler}>
              <ChevronLeft size={13} />
            </p>
            <p
              onClick={page1}
              className={`${pageNo === 1 ? "page" : "notPage"}`}
            >
              1
            </p>
            <p
              onClick={page2}
              className={`${pageNo === 2 ? "page" : "notPage"}`}
            >
              2
            </p>
            <p
              onClick={page3}
              className={`${pageNo === 3 ? "page" : "notPage"}`}
            >
              3
            </p>
            <p
              onClick={page4}
              className={`${pageNo === 4 ? "page" : "notPage"}`}
            >
              4
            </p>
            <p
              onClick={page5}
              className={`${pageNo === 5 ? "page" : "notPage"}`}
            >
              5
            </p>
            <p onClick={nextHandler}>
              <ChevronRight size={13} />
            </p>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}

export default Crypto;
