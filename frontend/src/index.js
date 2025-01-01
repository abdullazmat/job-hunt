import App from "./App.js";
import "./index.css";
import React from "react";
import ReactDom from "react-dom/client";
import store from "./Redux/store.js";
import { Provider } from "react-redux";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
