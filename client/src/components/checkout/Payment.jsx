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

export default function Payment({ products }) {
  const globalState = useSelector(homeState);

  const handleCheckout = () => {
    const requestBody = {
      address: globalState?.userInfo?.address,
      userId: globalState?.userInfo?._id,
      products: products.map((product) => {
        return {
          productId: product?.productInfo?.product?._id,
          quantity: product.quantity,
        };
      }),
      amount: products.reduce((a, b) => a.amount + b.amount),
      status: ACTIVE,
      deliveryStatus: DELIVERY_STATUS_CONSTANTS.ORDERED,
    };
    sessionStorage.setItem("cartItems", JSON.stringify(requestBody));
  };

  return (
    <section>
      <div className="product"></div>
      <form action="/api/payment" method="POST">
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#FFA41B",
            width: "50%",
            color: "black",
            margin: "1rem",
          }}
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={handleCheckout}
        >
          Secure checkout
        </Button>
      </form>
    </section>
  );
}
