import { React, useState, useEffect, Suspense } from "react";
import "./Market.css";
import Charts from "react-apexcharts";
import Header from "./Header";
import Navbar from "./Navbar";
import supabase from "./config/supabaseClient";

import Crypto from "./Crypto";
import Gainers from "./Gainers";

import CoinData from "./CoinData";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import Losers from "./Losers";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Market({ getBookmarkHandler, token, setClicked, clicked }) {
  // const [ApiChecker, setApiChecker] = useState(true);
  // console.log(token);
  const [loading, setLoading] = useState(true);

  const [dataChecker, setDataChecker] = useState(false);

  const updateCheckerState = () => {
    setDataChecker(true);
  };

  // const { coinData, setCoinData } = useData() ?? [];

  // useEffect(() => {
  //   setCoinData(clicked);
  // }, [clicked]);

  const [link, setLink] = useState({
    coin: true,
    gainer: false,
    loser: false,
    // trending: false,
    currentData: "All Cryptocurrencies",
  });

  function HandleGainer() {
    setLoading(true);
    setDataChecker(false);
    console.log(dataChecker);

    setLink({
      coin: false,
      gainer: true,
      loser: false,
      currentData: "Top Gainers",
    });
    // setIsLoading((prevLoading) => !prevLoading);
  }

  function HandleLoser() {
    setLoading(true);
    setDataChecker(false);

    setLink({
      coin: false,
      gainer: false,
      loser: true,
      currentData: "Top Losers",
    });
    // setIsLoading((prevLoading) => !prevLoading);
  }

  function HandleMarket() {
    // setApiChecker(true);

    // setMarket(
    //   coin.slice(0, 10).map((item) => ({
    //     ...item,
    //     bookmarked: false,
    //   }))
    // );
    setDataChecker(false);

    setLoading(true);

    setLink({
      coin: true,
      gainer: false,
      loser: false,
      currentData: "All Cryptocurrencies",
    });

    // setIsLoading((prevLoading) => !prevLoading);
  }

  const trueStyle = "active";

  const falseStyle = "";

  return (
    <>
      {/* {clicked && <CoinData clicked={clicked} />} */}
      {/* {!clicked && ( */}
      <>
        <h1 className="market_header">Market</h1>
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
              Top Gainers
            </button>
            <button
              onClick={HandleLoser}
              className={link.loser ? trueStyle : falseStyle}
              // className={link.coin ? "active" : ""}
            >
              Top Losers
            </button>
          </div>
        </div>
        {/* {!loading && ( */}
        {/* <> */}
        {link.coin ? (
          <Crypto
            getBookmarkHandler={getBookmarkHandler}
            token={token}
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
            setClicked={setClicked}
            clicked={clicked}
            // setCoinData={setCoinData}
          />
        ) : link.gainer ? (
          <Gainers
            getBookmarkHandler={getBookmarkHandler}
            token={token}
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
            setClicked={setClicked}
            clicked={clicked}
          />
        ) : (
          <Losers
            getBookmarkHandler={getBookmarkHandler}
            token={token}
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
            setClicked={setClicked}
            clicked={clicked}
          />
        )}
      </>
    </>
  );
}

export default Market;
