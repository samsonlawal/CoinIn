import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import { Link, Outlet } from "react-router-dom";
// import "../Navbar.css";
import altLogo from "../img/altcoinn.svg";

function Layout() {
  const [modal, setModal] = useState(false);

  // function modalHandler() {
  //   setHeaderTop((prev) => {
  //     !prev;
  //   });
  //   // setGetBookmarks
  // }

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
