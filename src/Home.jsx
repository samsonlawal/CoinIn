import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
// import Navbar from "./Navbar";
import Header from "./Header";
import Faq from "./Faq";
// import Market from "./Market";
// import Portfolio from "./Portfolio";
import TopCoins from "./img/TopCoins";

function Home({ headerTop }) {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <TopCoins headerTop={headerTop} />
      {/* <Market  /> */}
      <Faq />

      {/* <Portfolio bookmarks={bookmarks} /> */}
    </>
  );
}

export default Home;
