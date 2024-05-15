import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Router from "../src/utils/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Router />
  </React.StrictMode>
);
