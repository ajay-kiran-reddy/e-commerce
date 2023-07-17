import { Button } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch } from "react-redux";
import { OrderSlice } from "../orders/slices/slice";

export default function Payment({ address }) {
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(OrderSlice.actions.getCreateOrderData());
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
