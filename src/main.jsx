import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.css";
import GlobalContextProvider from "./context/GlobalContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
