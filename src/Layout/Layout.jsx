import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import { Link, Outlet } from "react-router-dom";
// import "../Navbar.css";
import altLogo from "../img/altcoinn.svg";

function Layout({ token, setToken }) {
  const [modal, setModal] = useState(false);

  // function modalHandler() {
  //   setHeaderTop((prev) => {
  //     !prev;
  //   });
  //   // setGetBookmarks
  // }

  return (
    <>
      <Navbar setToken={setToken} token={token} />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
