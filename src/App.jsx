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
// import { Bounce, ToastContainer, toast } from "react-toastify";

function App() {
  const [headerTop, setHeaderTop] = useState();
  const [portfolio, setPortfolio] = useState(false);
  const [home, setHome] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  const [token, setToken] = useState(false);
  const [toasts, setToast] = useState(false);

  const handleToast = () => {
    // Logic for successful login
    //  setIsLoggedIn(true);
    setToast(true);
  };

  // const toasty = () => {
  //   toast.success("Login successful");
  // };

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  // function to get the bookmark from database
  const getBookmarkHandler = (bookmarkData) => {
    setBookmarks(bookmarkData);
  };

  useEffect(() => {
    if (sessionStorage.getItem("satus")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
    // console.log(status);
  }, []);

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
        setHeaderTop(data.slice(0, 50));
      });
  }, []);

  // console.log(headerTop);

  const routerConfig = [
    {
      path: "/",
      element: <Layout token={token} setToken={setToken} />,

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
              token={token}
            />
          ),
        },

        // status
        //   ? {
        //       path: "portfolio",
        //       element: (
        //         <Portfolio
        //           bookmarks={bookmarks}
        //           status={status}
        //           // setStatus={setStatus}
        //         />
        //       ),
        //     }
        //   : {
        //       path: "login",
        //       element: <LoginForm status={status} setStatus={setStatus} />,
        //     },
        {
          path: "portfolio",
          element: (
            <Portfolio
              bookmarks={bookmarks}
              token={token}
              toasts={toasts}
              // toasty={toasty}
              // setStatus={setStatus}
            />
          ),
        },

        {
          path: "login",
          element: (
            <LoginForm
              token={token}
              setToken={setToken}
              handleToast={handleToast}
            />
          ),
        },
        {
          path: "signup",
          element: <SignupForm />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routerConfig);

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
