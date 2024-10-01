import { useEffect, useState, useRef, Suspense } from "react";
import "./Portfolio.css";
import Navbar from "./Navbar";
import Charts from "react-apexcharts";
import supabase from "./config/supabaseClient";
import App from "./App";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router-dom";
import Chart from "./Chart";

import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import { DataContext } from "./DataContext";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Portfolio({
  // token,
  justLoggedIn,
  setJustLoggedIn,
  // clicked,
  // setClicked,
}) {
  // Context
  const { clicked, setClicked, token } = useContext(DataContext);

  const [bookmarks, setBookmarks] = useState();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token and login just occurred
    if (token && justLoggedIn) {
      // Display toast notification
      toast.success("Login successful");
      // Reset the flag
      setJustLoggedIn(false);
    }
  }, [token, justLoggedIn]);

  const [dataChecker, setDataChecker] = useState(false);

  const updateCheckerState = () => {
    setDataChecker(true);
  };

  useEffect(() => {
    const fetchId = async () => {
      const userId = token && token.user.id; // Get user ID
      // console.log(userId);

      const { data, error } = await supabase
        .from("bookmarks")
        .select()
        .eq("user_id", userId);

      if (error) {
        setFetchError("Couldn't fetch");
        setBookmarks(null);
        // console.log(error);
      }

      if (data) {
        setBookmarks(data);
        // getBookmarkHandler(data);
        // console.log(data);
        setFetchError(null);
      }
    };

    fetchId();
  }, []);

  useEffect(() => {
    const fetchDataForBookmarks = async () => {
      try {
        const bookmarkDataPromises = bookmarks.map(async (bookmark) => {
          // Fetch additional data from the CoinGecko API using the coin ID
          const coinResponse = await fetch(
            `https://api.coingecko.com/api/v3/coins/${bookmark.coinId}`
          );
          const coinData = await coinResponse.json();

          // Fetch market chart data for the past 7 days using the coin ID
          const marketChartDataResponse = await fetch(
            `https://api.coingecko.com/api/v3/coins/${bookmark.coinId}/market_chart?vs_currency=usd&days=7`
          );
          const marketChartData = await marketChartDataResponse.json();

          // Merge additional data and market chart data with the existing bookmark data
          const mergedData = { ...coinData, ...marketChartData };

          // console.log(mergedData);

          return mergedData;
        });

        const bookmarkDataArray = await Promise.all(bookmarkDataPromises);
        setBookmarkList(bookmarkDataArray);
        updateCheckerState();
      } catch (error) {
        console.error("Error fetching data for bookmarks:", error);
      }
    };

    if (bookmarks) {
      fetchDataForBookmarks();
    }
  }, [bookmarks]);

  // Bookmark Removal function
  const BookmarkHandler = async (itemId) => {
    const userId = token && token.user.id; // Get user ID
    // console.log(userId);

    setBookmarkList(bookmarkList.filter((item) => item.id !== itemId));

    // const { user } = supabase.auth.session(); // Get current user
    // const userId = user.id; // Get user ID

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .match({ coinId: itemId, user_id: userId });

      toast.success("Bookmark removed successfully");

      if (data) {
        // console.log("Bookmark removed successfully:", data);
        // console.log(market);
      }

      if (error) {
        // console.log("Error removing bookmark:", error);
      }
    } catch (error) {
      // console.log("Error removing bookmark:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  // Timer delay for the line graph
  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 3000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // console.log(bookmarks);
  }, [bookmarkList]);

  function clickHandler(id) {
    // console.log(id);
    setClicked(id);
    window.scrollTo(0, 0); // Scrolls to the top left corner of the page
    // setCoinData(id);

    if (clicked) {
      navigate(`/coin/${id}`);
    }
  }

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <>
        {token ? (
          <div className="portfolio">
            <h1 className="portolio_header">My Portfolio</h1>
            {/* <button onClick={logger}>Log</button> */}
            <div className="table-div">
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
                  {!dataChecker &&
                    [...Array(5)].map((_, index) => (
                      <tr key={index}>
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
                    ))}
                  {bookmarkList &&
                    dataChecker &&
                    bookmarkList.map((item) => {
                      const renderChart = (
                        <Suspense fallback={<div>Loading Chart...</div>}>
                          <Chart data={item.prices} />
                        </Suspense>
                      );

                      return (
                        <tr key={item.symbol} id={item.id}>
                          <td className="saveButton">
                            <i
                              className={`fa-star ${
                                bookmarks &&
                                bookmarks.some((obj) => obj.coinId === item.id)
                                  ? "fa-solid"
                                  : "fa-regular"
                              }`}
                              onClick={() => BookmarkHandler(item.id)}
                            ></i>
                          </td>
                          <td className="orders">
                            <p>{item.market_cap_rank}</p>
                          </td>
                          <td className="name">
                            <img src={item.image.small} alt="" />
                            <p
                              onClick={() => {
                                clickHandler(item.id);
                              }}
                            >
                              {item.name}{" "}
                              <span>{item.symbol.toUpperCase()}</span>
                            </p>
                          </td>
                          <td className="price">
                            <p>
                              $
                              {item.market_data.current_price.usd.toLocaleString()}
                            </p>
                          </td>
                          <td className="vol">
                            <p
                              className={
                                item.market_data.price_change_percentage_24h >=
                                0
                                  ? "green"
                                  : "red"
                              }
                            >
                              {item.market_data.price_change_percentage_24h.toFixed(
                                1
                              )}
                              %
                            </p>
                          </td>
                          <td className="cap">
                            <p>
                              $
                              {item.market_data.market_cap.usd.toLocaleString()}
                            </p>
                          </td>
                          <td className="days">
                            {isLoading ? (
                              <p>
                                <Skeleton />
                              </p>
                            ) : (
                              renderChart
                            )}{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="logger-div">
            <h1 className="logger">
              Login to show your portfolio,{" "}
              <span>
                <NavLink to="/login">here</NavLink>
              </span>
            </h1>
          </div>
        )}
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
      </>
    </SkeletonTheme>
  );
}

//  //     // .catch((error) => {
//     //   console.error(`Error fetching data for ${coinId}:`, error);
//     //   return null;
//     // }
