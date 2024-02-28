import { useEffect, useState } from "react";
import "./Portfolio.css";
import Navbar from "./Navbar";
import Charts from "react-apexcharts";
import supabase from "./config/supabaseClient";

export default function Portfolio({ bookmarks }) {
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    const bookmarkData =
      bookmarks &&
      bookmarks.map(async (bookmark) => {
        // console.log(bookmark);
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${bookmark.coinId}`
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(`Error fetching data for ${bookmark}:`, error);
          return null;
        }
      });

    Promise.all(bookmarkData).then((coinDataArray) => {
      // 'coinDataArray' contains an array of responses from the API
      // You can now set this array in your component state
      setBookmarkList(coinDataArray.filter(Boolean)); // filter out null values
    });
  }, [bookmarks]);

  // Bookmark Removal function
  const BookmarkHandler = async (itemId) => {
    setBookmarkList(bookmarkList.filter((item) => item.id !== itemId));

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("coinId", itemId);

      if (data) {
        console.log("Bookmark removed successfully:", data);
        console.log(market);
      }

      // if (error) {
      //   console.log("Error removing bookmark:", error);
      // }
    } catch (error) {
      console.log("Error removing bookmark:", error);
    }
  };

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
    console.log(bookmarkList);
  }, [bookmarkList]);

  function logger() {
    // console.log(bookmarkList);
  }

  return (
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
                console.log(item);
                // const lineColor =
                //   item.sparkline_in_7d.price.slice(-1)[0] < 0
                //     ? "#27ca4e"
                //     : "#ff3a33";

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
                        ${item.market_data.current_price.usd.toLocaleString()}
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
                      <p>${item.market_data.market_cap.usd.toLocaleString()}</p>
                    </td>
                    <td className="days">
                      {/* {isLoading ? <p>Loading...</p> : renderChart} */}
                      ...{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  //     // .catch((error) => {
//     //   console.error(`Error fetching data for ${coinId}:`, error);
//     //   return null;
//     // }
