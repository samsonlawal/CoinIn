import { React, useEffect, useState } from "react";
import "./CoinData.css";
import btc from "./img/btclogo.webp";
import Charts from "react-apexcharts";
import Footer from "./Footer";

import { useData } from "./DataContext";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CoinData({ clicked }) {
  const [theData, setTheData] = useState();
  const [chartData, setChartData] = useState([]);

  const one = 1;
  const seven = 7;
  const month = 30;
  const year = 365;

  const [chartRange, setChartRange] = useState(one);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${clicked}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTheData(data);
      });

    fetch(
      `https://api.coingecko.com/api/v3/coins/${clicked}/market_chart?vs_currency=usd&days=${chartRange}`
    )
      .then((response) => response.json())
      .then((data) => {
        setChartData(data.prices);
      });

    console.log(clicked);
  }, []);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  var options = {
    series: [
      {
        name: "STOCK ABC",
        data: [],
        strokeWidth: 1,
      },
    ],
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },

    tooltip: {
      enabled: false,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: ["#b949b9"],
    },
    xaxis: {
      type: "datetime",
    },
    legend: {
      horizontalAlign: "left",
    },
    grid: {
      show: true,
      borderColor: "#bcbcbc25",
      position: "back",
    },
    fill: {
      colors: ["#b949b9"],
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },

    yaxis: {
      show: true,
      opposite: true,
      showAlways: false,
      showForNullSeries: true,
      seriesName: undefined,
      reversed: false,
      logarithmic: false,
      logBase: 10,
      tickAmount: undefined,
      min: undefined,
      max: undefined,
      stepSize: undefined,
      forceNiceScale: false,
      floating: false,
      decimalsInFloat: 0,
      // labels: {
      //   style: {
      //     colors: "#464362",
      //   },

      // },
    },
  };

  const trueStyle = "active";
  const falseStyle = "";

  let lineColor;

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${clicked}/market_chart?vs_currency=usd&days=${chartRange}`
    )
      .then((response) => response.json())
      .then((data) => {
        setChartData(data.prices);
      });
  }, [chartRange]);

  // if (chartData) {
  //   lineColor =
  //     theData.market_data.price_change_percentage_24h < 0 ? "red" : "green";
  // }

  function rangeHandler(range) {
    setChartRange(range);
  }

  const [inputValue, setInputValue] = useState("");
  const [calculated, setCalculated] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // setInputValue(event.target.value);
    // Further processing with the inputValue can be done here
  };

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        {/* {!theData && <p>Loading...</p>} */}
        {!theData ? (
          <>
            <div className="coinContainer-skel">
              <div className="coin-data-skel">
                {/* <div className="name-div-skel">
                  <Skeleton height={40} />
                </div> */}

                <div className="price-div-skel">
                  <Skeleton height={60} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="price-div-skel2">
                  <Skeleton height={60} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>
              </div>

              {/* Chart */}
              <div className="chart">
                <div className="innerChart">
                  <Skeleton height={470} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="coinContainer">
              <div className="coin-data">
                <div className="name-div">
                  <img src={theData.image.small} alt="" />
                  <h3 className="name-div-name">{theData.name}</h3>

                  <p className="name-div-id">
                    {theData.symbol.toUpperCase()} Price
                  </p>
                  <p className="name-div-rank">#{theData.market_cap_rank}</p>
                </div>

                <div className="price-div">
                  <h1 className="price-div-price">
                    ${theData.market_data.current_price.usd.toLocaleString()}
                  </h1>
                  <p
                    className={`price-div-percentage
                    ${
                      theData.market_data.price_change_percentage_24h > 0
                        ? "green"
                        : "red"
                    }
                  `}
                  >
                    {theData.market_data.price_change_percentage_24h.toFixed(1)}
                    %
                  </p>
                </div>

                <div className="data-div">
                  <div className="data-div-cap">
                    <p className="text">
                      Market Cap
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      $
                      {theData.market_data.fully_diluted_valuation.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      Fully Diuted Valuation
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.market_cap.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time High{" "}
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.ath.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time Low
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.atl.usd.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Info */}

                <div className="data-link-div">
                  <h3>Info</h3>
                  <div className="data-div-cap">
                    <p className="text">Website</p>
                    <div className="comms">
                      <p className="link">
                        <a
                          href={theData.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          bitcoin.org
                        </a>
                      </p>
                      <p className="link">
                        <a
                          href={theData.links.whitepaper}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Whitepaper
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">Community</p>
                    <div className="comms">
                      <p className="link">
                        <a
                          href={`https://twitter.com${theData.links.twitter_screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </p>
                      {/* <p className="link">Facebook</p> */}
                      <p className="link">
                        <a
                          href={theData.links.official_forum_url[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          bitcointalk.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">API ID</p>
                    <div className="comms">
                      <p className="link">
                        <a>bitcoin</a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">Categories</p>
                    <div className="comms">
                      <p className="link">
                        <a>Cryptocurrency</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="chart">
                <div className="daysHolder">
                  <button
                    className={`${chartRange === one ? "active" : ""}`}
                    onClick={() => rangeHandler(one)}
                  >
                    24h
                  </button>
                  <button
                    className={`${chartRange === seven ? "active" : ""}`}
                    onClick={() => rangeHandler(seven)}
                  >
                    1W
                  </button>
                  <button
                    className={`${chartRange === month ? "active" : ""}`}
                    onClick={() => rangeHandler(month)}
                  >
                    1M
                  </button>
                  <button
                    className={`${chartRange === year ? "active" : ""}`}
                    onClick={() => rangeHandler(year)}
                  >
                    1Y
                  </button>
                </div>
                <div className="innerChart">
                  {chartData && (
                    // <p>Loaded</p>
                    <Charts
                      options={{
                        ...options,
                        colors: ["#27ca4e"],
                      }}
                      series={[
                        {
                          name: "history",
                          data: chartData,
                        },
                      ]}
                      type="area"
                      height={450}
                    />
                  )}
                </div>

                {/* Converter */}
                <div className="converter">
                  <div className="inputt">
                    <label htmlFor="">USD</label>
                    <input type="text" onChange={handleChange} />
                  </div>
                  <div className="inputt">
                    <p className="sym">{theData.symbol.toUpperCase()}</p>

                    <p>
                      {(
                        inputValue / theData.market_data.current_price.usd
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/*<<<<<<< Mobile >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

        {/* {!theData && <p>Loading...</p>} */}
        {!theData ? (
          <>
            <div className="coinContainer-skel-mobile">
              <div className="coin-data-skel">
                {/* <div className="name-div-skel">
                  <Skeleton height={40} />
                </div> */}

                <div className="price-div-skel">
                  <Skeleton height={60} />
                </div>

                {/* Chart */}
                <div className="chart">
                  <div className="innerChart">
                    <Skeleton height={300} />
                  </div>
                </div>

                <div className="price-div-skel2">
                  <Skeleton height={60} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>

                <div className="data-div-skel">
                  <Skeleton height={20} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="coinContainer-mobile">
              <div className="coin-data">
                <div className="name-div">
                  <img src={theData.image.small} alt="" />
                  <h3 className="name-div-name">{theData.name}</h3>

                  <p className="name-div-id">
                    {theData.symbol.toUpperCase()} Price
                  </p>
                  <p className="name-div-rank">#{theData.market_cap_rank}</p>
                </div>

                <div className="price-div">
                  <h1 className="price-div-price">
                    ${theData.market_data.current_price.usd.toLocaleString()}
                  </h1>
                  <p
                    className={`price-div-percentage
                    ${
                      theData.market_data.price_change_percentage_24h > 0
                        ? "green"
                        : "red"
                    }
                  `}
                  >
                    {theData.market_data.price_change_percentage_24h.toFixed(1)}
                    %
                  </p>
                </div>

                {/* Chart */}
                <div className="chart">
                  <div className="daysHolder">
                    <button
                      className={`${chartRange === one ? "active" : ""}`}
                      onClick={() => rangeHandler(one)}
                    >
                      24h
                    </button>
                    <button
                      className={`${chartRange === seven ? "active" : ""}`}
                      onClick={() => rangeHandler(seven)}
                    >
                      1W
                    </button>
                    <button
                      className={`${chartRange === month ? "active" : ""}`}
                      onClick={() => rangeHandler(month)}
                    >
                      1M
                    </button>
                    <button
                      className={`${chartRange === year ? "active" : ""}`}
                      onClick={() => rangeHandler(year)}
                    >
                      1Y
                    </button>
                  </div>
                  <div className="innerChart">
                    {chartData && (
                      <Charts
                        options={{
                          ...options,
                          colors: ["#27ca4e"],
                        }}
                        series={[
                          {
                            name: "history",
                            data: chartData,
                          },
                        ]}
                        type="area"
                        height={450}
                      />
                    )}
                  </div>

                  <div className="innerChart-smallest">
                    {chartData && (
                      // <p>Loaded</p>
                      <Charts
                        options={{
                          ...options,
                          colors: ["#27ca4e"],
                        }}
                        series={[
                          {
                            name: "history",
                            data: chartData,
                          },
                        ]}
                        type="area"
                        height={300}
                      />
                    )}
                  </div>

                  {/* Converter */}
                  <div className="converter">
                    <div className="inputt">
                      <label htmlFor="">USD</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputt">
                      <p className="sym">{theData.symbol.toUpperCase()}</p>

                      <p>
                        {(
                          inputValue / theData.market_data.current_price.usd
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="data-div">
                  <div className="data-div-cap">
                    <p className="text">
                      Market Cap
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      $
                      {theData.market_data.fully_diluted_valuation.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      Fully Diuted Valuation
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.market_cap.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time High{" "}
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.ath.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time Low
                      <i
                        class="fa-solid fa-circle-exclamation"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        data-tooltip-place="top"
                      ></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.atl.usd.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Info */}

                <div className="data-link-div">
                  <h3>Info</h3>
                  <div className="data-div-cap">
                    <p className="text">Website</p>
                    <div className="comms">
                      <p className="link">
                        <a
                          href={theData.links.homepage[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          bitcoin.org
                        </a>
                      </p>
                      <p className="link">
                        <a
                          href={theData.links.whitepaper}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Whitepaper
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">Community</p>
                    <div className="comms">
                      <p className="link">
                        <a
                          href={`https://twitter.com${theData.links.twitter_screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </p>
                      {/* <p className="link">Facebook</p> */}
                      <p className="link">
                        <a
                          href={theData.links.official_forum_url[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          bitcointalk.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">API ID</p>
                    <div className="comms">
                      <p className="link">
                        <a>bitcoin</a>
                      </p>
                    </div>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">Categories</p>
                    <div className="comms">
                      <p className="link">
                        <a>Cryptocurrency</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SkeletonTheme>

      <Footer />
    </>
  );
}

export default CoinData;
