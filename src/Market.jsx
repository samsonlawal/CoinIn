import { React, useState, useEffect, Suspense } from "react";
import "./Market.css";
import Charts from "react-apexcharts";
import Header from "./Header";
import Navbar from "./Navbar";
import supabase from "./config/supabaseClient";

import Crypto from "./Crypto";
import Gainers from "./Gainers";

import CoinData from "./CoinData";

import { DataContext } from "./DataContext";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import Losers from "./Losers";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Market() {
  const [loading, setLoading] = useState(true);

  const [dataChecker, setDataChecker] = useState(false);

  const updateCheckerState = () => {
    setDataChecker(true);
  };

  const [link, setLink] = useState({
    coin: true,
    gainer: false,
    loser: false,
    currentData: "All Cryptocurrencies",
  });

  function HandleGainer() {
    setLoading(true);
    setDataChecker(false);
    // console.log(dataChecker);

    setLink({
      coin: false,
      gainer: true,
      loser: false,
      currentData: "Top Gainers",
    });
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
  }

  function HandleMarket() {
    setDataChecker(false);

    setLoading(true);

    setLink({
      coin: true,
      gainer: false,
      loser: false,
      currentData: "All Cryptocurrencies",
    });
  }

  const trueStyle = "active";

  const falseStyle = "";

  return (
    <>
      <>
        <h1 className="market_header">Market</h1>
        <div className="linkers">
          <div className="top-shelf">
            <button
              onClick={HandleMarket}
              className={link.coin ? trueStyle : falseStyle}
            >
              Cryptocurrencies
            </button>
            <button
              onClick={HandleGainer}
              className={link.gainer ? trueStyle : falseStyle}
            >
              Top Gainers
            </button>
            <button
              onClick={HandleLoser}
              className={link.loser ? trueStyle : falseStyle}
            >
              Top Losers
            </button>
          </div>
        </div>
        {link.coin ? (
          <Crypto
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
          />
        ) : link.gainer ? (
          <Gainers
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
          />
        ) : (
          <Losers
            updateCheckerState={updateCheckerState}
            dataChecker={dataChecker}
            setDataChecker={setDataChecker}
          />
        )}
      </>
    </>
  );
}

export default Market;
