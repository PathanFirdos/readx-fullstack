import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./UserContext"; // Import the UserProvider
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

ReactDOM.render(
  <UserProvider>
    <Router> {/* Wrap the app with both UserProvider and BrowserRouter */}
      <App />
    </Router>
  </UserProvider>,
  document.getElementById("root")
);
