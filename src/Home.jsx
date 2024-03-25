import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
// import Navbar from "./Navbar";
import Header from "./Header";
import Faq from "./Faq";
// import Market from "./Market";
// import Portfolio from "./Portfolio";
import TopCoins from "./img/TopCoins";
import Footer from "./Footer";

function Home({ headerTop }) {
  return (
    <>
      <Header />
      <TopCoins headerTop={headerTop} />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
