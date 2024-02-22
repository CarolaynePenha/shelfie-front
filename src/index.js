import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/reset.css";
import App from "./components/App";

const container = document.querySelector(".root");

const divRoot = ReactDOM.createRoot(container);
divRoot.render(<App />);
