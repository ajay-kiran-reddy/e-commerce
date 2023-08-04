import { Button } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch, useSelector } from "react-redux";
import { OrderSlice } from "../orders/slices/slice";
import { homeState } from "../home/slices/slice";
import {
  ACTIVE,
  DELIVERY_STATUS_CONSTANTS,
} from "../admin/dashboard/constants/DashboardConstants";
import { CartSlice } from "../cart/slices/slice";

export default function Payment({ products }) {
  const globalState = useSelector(homeState);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    const requestBody = {
      address: globalState?.userInfo?.address,
      userId: globalState?.userInfo?._id,
      products: products.map((product) => {
        return {
          product: product?.product?._id,
          quantity: product.quantity,
        };
      }),
      amount: products.reduce((a, b) => a + b.amount, 0),
      status: ACTIVE,
      deliveryStatus: DELIVERY_STATUS_CONSTANTS.ORDERED,
    };
    console.log(requestBody, "[REQUEST]");
    localStorage.setItem("cartItems", JSON.stringify(requestBody));
    dispatch(CartSlice.actions.makePayment(requestBody));
  };

  return (
    <section>
      <div className="product"></div>
      <Button
        type="submit"
        variant="contained"
        style={{
          // backgroundColor: "#FFA41B",
          width: "50%",
          // color: "black",
          margin: "1rem",
        }}
        color="primary"
        startIcon={<ShoppingCartCheckoutIcon />}
        onClick={handleCheckout}
      >
        Secure checkout
      </Button>
    </section>
  );
}
