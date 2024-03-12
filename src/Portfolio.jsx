import { useEffect, useState, useRef } from "react";
import "./Portfolio.css";
import Navbar from "./Navbar";
import Charts from "react-apexcharts";
import supabase from "./config/supabaseClient";
import App from "./App";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router-dom";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

export default function Portfolio({ token, justLoggedIn, setJustLoggedIn }) {
  const [bookmarks, setBookmarks] = useState();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Check if there's a token and login just occurred
    if (token && justLoggedIn) {
      // Display toast notification
      toast.success("Login successful");
      // Reset the flag
      setJustLoggedIn(false);
    }
  }, [token, justLoggedIn]);

  // Function to set the flag when login occurs
  // const handleLogin = () => {
  // setJustLoggedIn(true);
  // };

  // toasts && toast.success("Login successful");

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
        console.log(error);
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
        console.log("Bookmark removed successfully:", data);
        // console.log(market);
      }

      if (error) {
        console.log("Error removing bookmark:", error);
      }
    } catch (error) {
      console.log("Error removing bookmark:", error);
    }
  };

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

  // Timer delay for the line graph
  useEffect(() => {
    // Simulate a 10-second delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the loading text after 10 seconds
    }, 10000);

    // Cleanup the timeout when the component unmounts or if it gets updated
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // console.log(bookmarks);
  }, [bookmarkList]);

  return (
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
                {bookmarkList &&
                  bookmarkList.map((item) => {
                    console.log(
                      item.prices
                        .map(([_, secondItem]) => secondItem)
                        .slice(-1)[0] >
                        item.prices.map(([_, secondItem]) => secondItem)[0]
                    );
                    const lineColor =
                      item.prices
                        .map(([_, secondItem]) => secondItem)
                        .slice(-1)[0] >
                      item.prices.map(([_, secondItem]) => secondItem)[0]
                        ? "#27ca4e"
                        : "#ff3a33";

                    // const renderChart = (
                    //   <Charts
                    //     height="60%"
                    //     id="charts"
                    //     options={{ ...options, colors: [lineColor] }}
                    //     series={[
                    //       {
                    //         name: "history",
                    //         data: item.prices,
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
                          <p>
                            {item.name} <span>{item.symbol.toUpperCase()}</span>
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
                              item.market_data.price_change_percentage_24h >= 0
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
                            ${item.market_data.market_cap.usd.toLocaleString()}
                          </p>
                        </td>
                        <td className="days">
                          {/* {isLoading ? <p>Loading...</p> : renderChart} */}
                          ...
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
  );
}

//  //     // .catch((error) => {
//     //   console.error(`Error fetching data for ${coinId}:`, error);
//     //   return null;
//     // }
