import { Button } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Payment() {
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
        >
          Secure checkout
        </Button>
      </form>
    </section>
  );
}
