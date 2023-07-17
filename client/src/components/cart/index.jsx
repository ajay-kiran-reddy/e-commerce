import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice, Cart } from "./slices/slice";
import { formatCurrencyToIndianRupees } from "../../utils/globalUtils";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router";
import Payment from "../checkout/Payment";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
  },
  title: {
    fontWeight: "500 !important",
    fontSize: "28px !important",
  },
  paper: {
    padding: "1rem",
  },
  productInfo: {},
  subTotal: {
    fontSize: "18px",
    fontWeight: "700 !important",
    padding: "0.5rem",
  },
  divider: {
    margin: "10px 0 10px 0 !important",
  },
  checkout: {
    backgroundColor: "#FFA41B",
    width: "50%",
    color: "black",
    margin: "1rem",
  },
});

export default function CartPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(Cart);
  const [quantity, setQuantity] = useState(1);
  const [totalProductQty, setTotalProductsQty] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const products = state?.cartSummary?.products;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CartSlice.actions.getCartSummary());
  }, []);

  const handleQuantity = (operation) => {
    if (operation === "minus") {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const products = state?.cartSummary?.products;
    console.log(products, "[products]");
    setTotalProductsQty(products?.reduce((a, b) => a.quantity + b.quantity));
    setTotalAmount(products?.reduce((a, b) => a.amount + b.amount));
  }, [state?.cartSummary?.products]);

  return (
    <Grid container spacing={0} marginTop="5rem">
      <Grid item xs={1}></Grid>

      <Grid item xs={7} className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography className={classes.title}>Shopping Cart</Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.productInfo}>
            <Grid item xs={12}>
              {products?.map((product) => {
                return (
                  <Grid container style={{ position: "relative" }}>
                    <Grid item xs={3}>
                      <img
                        alt="product_image"
                        src={product?.productInfo?.product?.images[0]}
                        width="100%"
                        maxHeight="300px"
                        height="250px"
                        backgroundSize="contain"
                        backgroundRepeat="no-repeat"
                        border="none"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6" gutterBottom>
                        {product?.productInfo?.product?.name}
                      </Typography>
                      {formatCurrencyToIndianRupees(
                        product?.productInfo?.product?.price
                      )}

                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          width: "100%",
                        }}
                      >
                        <Button onClick={() => handleQuantity("minus")}>
                          <RemoveIcon />
                        </Button>
                        <Button>{product?.quantity}</Button>
                        <Button onClick={() => handleQuantity("plus")}>
                          <AddIcon />
                        </Button>
                      </ButtonGroup>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3} style={{ marginLeft: "2rem" }}>
        <Paper elevation={3}>
          <Typography className={classes.subTotal}>Order Summary</Typography>
          <Divider />

          <div style={{ padding: "1rem" }}>
            <span style={{ float: "left" }}>
              {" "}
              Item Total ({totalProductQty}) :
            </span>
            <span style={{ float: "right" }}>
              {formatCurrencyToIndianRupees(totalAmount)}
            </span>
          </div>

          <div style={{ padding: "1rem" }}>
            <span style={{ float: "left" }}>Shipping :</span>
            <span style={{ float: "right" }}>FREE</span>
          </div>

          <Divider style={{ width: "100%", margin: "1rem 0 1rem 0" }} />

          <div style={{ padding: "0 1rem 0 1rem" }}>
            <span style={{ float: "left" }}>Total </span>
            <span style={{ float: "right" }}>
              {formatCurrencyToIndianRupees(totalAmount)}
            </span>
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Payment products={state?.cartSummary?.products} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
