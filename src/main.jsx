import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Market from "./Market";
import Header from "./Header";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },

//   { path: "portfolio", element: <Portfolio /> },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
