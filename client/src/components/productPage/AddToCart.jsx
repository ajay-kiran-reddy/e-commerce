import { ButtonGroup, Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { formatCurrencyToIndianRupees } from "../../utils/globalUtils";
import { useDispatch, useSelector } from "react-redux";
import { ProductSlice, ProductState } from "./slices/slice";
import { useNavigate } from "react-router";

export default function AddToCart({ productInfo }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(productInfo?.price);
  const dispatch = useDispatch();
  const state = useSelector(ProductState);

  useEffect(() => {
    setQuantity(state?.ATCProductInfo?.quantity || 1);
    setPrice(state?.ATCProductInfo?.amount);
  }, [state.ATCProductInfo]);

  useEffect(() => {
    productInfo?._id &&
      dispatch(ProductSlice.actions.getProductDataFromCart(productInfo?._id));
    setPrice(productInfo?.price);
  }, [productInfo]);

  const handleAddToCart = () => {
    dispatch(ProductSlice.actions.addToCart({ ...productInfo, quantity }));
  };

  const handleQuantity = (operation) => {
    if (operation === "minus") {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ textAlign: "left" }}>
        {formatCurrencyToIndianRupees(price, 28)}
        {formatCurrencyToIndianRupees(27999, 28, true)}
      </Grid>
      <Grid item xs={12} style={{ textAlign: "left" }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => handleQuantity("minus")}>
            <RemoveIcon />
          </Button>
          <Button>{quantity}</Button>
          <Button onClick={() => handleQuantity("plus")}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#FFD811",
            width: "100%",
            color: "black",
          }}
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#FFA41B", width: "100%", color: "black" }}
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={() => navigate("/cartSummary")}
        >
          Buy Now
        </Button>
      </Grid>
    </Grid>
  );
}
