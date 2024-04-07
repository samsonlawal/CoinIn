import { React, useEffect, useState } from "react";
import "./CoinData.css";
import btc from "./img/btclogo.webp";
import Charts from "react-apexcharts";
import Footer from "./Footer";

import { useData } from "./DataContext";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CoinData({ clicked }) {
  // const { coinData } = useData() ?? {};
  // const { coinData } = useData() ?? {};

  // const coinData;
  const [theData, setTheData] = useState();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // let coinDataW;
    // let marketChartData;

    fetch(`https://api.coingecko.com/api/v3/coins/${clicked}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTheData(data);
      });

    fetch(
      `https://api.coingecko.com/api/v3/coins/${clicked}/market_chart?vs_currency=usd&days=1`
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
      colors: ["#32CA5B"],
    },
    xaxis: {
      type: "datetime",
    },
    legend: {
      horizontalAlign: "left",
    },
    grid: {
      show: true,
      borderColor: "#464362",
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0.2,
      },
      colors: ["#32CA5B"],
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
    },
  };

  // console.log(id);

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  // chart.render();

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        {!theData && <p>Loading...</p>}
        {theData && (
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
                  <p className="price-div-percentage">
                    {theData.market_data.price_change_percentage_24h.toFixed(1)}
                    %
                  </p>
                </div>

                <div className="data-div">
                  <div className="data-div-cap">
                    <p className="text">
                      Market Cap
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </p>
                    <p className="num">
                      $
                      {theData.market_data.fully_diluted_valuation.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      Fully Diuted Valuation
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.market_cap.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time High{" "}
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </p>
                    <p className="num">
                      ${theData.market_data.ath.usd.toLocaleString()}
                    </p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">
                      All Time Low
                      <i class="fa-solid fa-circle-exclamation"></i>
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
                    <p className="link">bitcoin</p>
                  </div>

                  <div className="data-div-cap">
                    <p className="text">Categories</p>
                    <p className="link">Cryptocurrency</p>
                  </div>
                  {/* 
        <div className="data-div-cap">
          <p className="text">ATH</p>
          <p>1,000,000,000</p>
        </div>

        <div className="data-div-cap">
          <p className="text">ATL</p>
          <p>1,000,000,000</p>
        </div> */}
                </div>

                {/* <div className="converter">input</div> */}
              </div>

              {/* Chart */}
              <div className="chart">
                <div className="innerChart">
                  {chartData && (
                    // <p>Loaded</p>
                    <Charts
                      options={{
                        ...options,
                        colors: [
                          theData.market_data.price_change_percentage_24h < 0
                            ? "#27ca4e"
                            : "#ff3a33",
                        ],
                      }}
                      series={[
                        {
                          name: "history",
                          data: chartData,
                        },
                      ]}
                      type="area"
                      height={500}
                    />
                  )}
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
