import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
// import Navbar from "./Navbar";
import Header from "./Header";
import Faq from "./Faq";
import TopCoins from "./img/TopCoins";
import Footer from "./Footer";
import News from "./News";
import CoinData from "./CoinData";

function Home({ headerTop }) {
  return (
    <>
      <Header />
      <TopCoins headerTop={headerTop} />
      <News />
      <Faq />
      <Footer />
      {/* <CoinData /> */}
    </>
  );
}

export default Home;
