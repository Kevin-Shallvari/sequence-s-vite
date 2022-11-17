import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { setup } from "goober";
import { createGlobalStyles } from "goober/global";

setup(React.createElement);

const GlobalStyles = createGlobalStyles`
  body,html {
    margin: 0;
    padding: 0;
    box-sizing: 'border-box'
  }
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
