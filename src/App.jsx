import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Faq from "./Faq";
import Market from "./Market";
import Portfolio from "./Portfolio";
import TopCoins from "./img/TopCoins";
import Home from "./Home";
import Layout from "./Layout/Layout";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

function App() {
  const [headerTop, setHeaderTop] = useState();
  const [portfolio, setPortfolio] = useState(false);
  const [home, setHome] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  // function to get the bookmark from database
  const getBookmarkHandler = (bookmarkData) => {
    setBookmarks(bookmarkData);
  };

  // // Function to update the data
  // const updateData = (newData) => {
  //   setHeaderTop(newData);
  //   // setGetBookmarks
  // };
  const apiKEY = "CG-9JnDkY6yxZsiy7xoXzsyqfLw";
  const usd = "usd";
  const pageNo = 1;
  const topGainers = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${usd}&per_page=100&page=${pageNo}&x_cg_demo_api_key=${apiKEY}&sparkline=true`;

  useEffect(() => {
    fetch(topGainers)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data returned by the API

        // Sort coins by percentage change
        const sortedCoins = data.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );

        // Get top gainers and losers
        // const topGainers = sortedCoins.slice(0, 10);
        // const topLosers = sortedCoins.slice(-10).reverse();

        // setTop({
        //   ...top,
        //   Gainers: topGainers,
        //   Losers: topLosers,
        // });
        setHeaderTop(data.slice(0, 50));
      });
  }, []);

  console.log(headerTop);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home headerTop={headerTop} />,
        },

        {
          path: "market",
          element: (
            <Market
              // updateData={updateData}
              getBookmarkHandler={getBookmarkHandler}
            />
          ),
        },
        {
          path: "portfolio",
          element: <Portfolio bookmarks={bookmarks} />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "signup",
          element: <SignupForm />,
        },
      ],
    },
  ]);

  return (
    <>
      {/* <Navbar /> */}
      {/* <Header /> */}
      {/* <TopCoins headerTop={headerTop} /> */}
      {/* <Market  /> */}
      {/* <Faq /> */}

      {/* <Portfolio bookmarks={bookmarks} /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
