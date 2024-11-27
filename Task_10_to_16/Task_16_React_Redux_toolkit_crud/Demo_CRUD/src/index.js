import React from "react";
import ReactDOM from "react-dom/client"; // Import the new API
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./styles.css";

// Create a root element for React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);