import React, { useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { OrderSlice } from "../orders/slices/slice";
import { CartSlice } from "../cart/slices/slice";

const useStyles = makeStyles({
  title: {
    color: "#88B04B",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontWeight: 900,
    fontSize: "40px",
    marginBottom: "10px",
  },
  description: {
    color: "#404F5E",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontSize: "20px",
    margin: 0,
  },
  icon: {
    color: "#9ABC66",
    fontSize: "100px",
    lineHeight: "200px",
    marginLeft: "-15px",
  },
  card: {
    marginTop: "5rem",
    background: "white",
    padding: "60px",
    borderRadius: "4px",
    boxShadow: "0 2px 3px #C8D0D8",
    display: "inline-block",
    margin: "0 auto",
  },
});

export default function SuccessCheckout() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    const parsedData = cartItems && JSON.parse(cartItems);
    if (parsedData) {
      dispatch(OrderSlice.actions.getCreateOrderData(parsedData));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(CartSlice.actions.resetCartData());
      localStorage.setItem("cartItems", "");
    };
  }, []);

  return (
    <div>
      <div className={classes.card}>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className={classes.icon}>✓</i>
        </div>
        <h1 className={classes.title}>Success</h1>
        <p className={classes.description}>
          We received your purchase request;
          <br /> You can track your order{" "}
          <a href="/orders" color="red">
            here
          </a>
        </p>
      </div>
    </div>
  );
}
