import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sagaMiddleware, store } from "./store";
import { Provider } from "react-redux";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// sagaMiddleware.run(rootSaga);

const themeColor = localStorage.getItem("themeColor") || "";
console.log(themeColor, "[themeColor]");

const theme = createTheme({
  typography: {
    fontFamily: `"Oxygen", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: themeColor || "#1769aa",
      color: "#fff !important",
    },
    secondary: {
      main: "#424242",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
