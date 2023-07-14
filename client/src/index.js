import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sagaMiddleware, store } from "./store";
import { Provider } from "react-redux";
import rootSaga from "./apiConfig/rootSaga";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// sagaMiddleware.run(rootSaga);

const theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
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
