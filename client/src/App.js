import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/dashboard";
import * as ROUTING_CONSTANTS from "./constants/Routing";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeSlice,
  homeState,
  updateApiResponse,
} from "./components/home/slices/slice";
import { useEffect } from "react";
import { RESET_API_RESPONSE } from "./constants/GlobalConstants";
import { Alert, Snackbar } from "@mui/material";
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ProductPage from "./components/productPage";
import CartPage from "./components/cart";
import CheckoutPage from "./components/checkout";
import UserProfile from "./components/userProfile";
import SuccessCheckout from "./components/checkout/SuccessCheckout";
import FailureCheckout from "./components/checkout/FailureCheckout";
import Orders from "./components/orders";
import SearchBrowse from "./components/searchBrowse";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(homeState);

  const handleClose = () => {
    dispatch(updateApiResponse(RESET_API_RESPONSE));
  };

  useEffect(() => {
    dispatch(HomeSlice.actions.fetchUserInfo());
  }, []);

  console.log("");

  return (
    <div className="App">
      <Snackbar
        open={state.apiResponse?.visible}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={state.apiResponse?.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {state.apiResponse?.message}
        </Alert>
      </Snackbar>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={ROUTING_CONSTANTS.DEFAULT_ROUTE} element={<Home />} />
          <Route
            exact
            path={ROUTING_CONSTANTS.LOGIN_ROUTE}
            element={<Login />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ADMIN_DASHBOARD_ROUTE}
            element={<AdminDashboard />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_PRODUCT_PAGE}
            element={<ProductPage />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_CART_SUMMARY}
            element={<CartPage />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_CHECKOUT}
            element={<CheckoutPage />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_PROFILE}
            element={<UserProfile />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.CHECKOUT_SUCCESS}
            element={<SuccessCheckout />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.CHECKOUT_FAILURE}
            element={<FailureCheckout />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_ORDERS}
            element={<Orders />}
          />
          <Route
            exact
            path={ROUTING_CONSTANTS.ROUTE_TO_BROWSE}
            element={<SearchBrowse />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
