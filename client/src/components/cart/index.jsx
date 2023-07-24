import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
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
import CustomLoader from "../shared/Loader";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ProductSlice } from "../productPage/slices/slice";

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
  const [totalProductQty, setTotalProductsQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const products = state?.cartSummary?.products;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CartSlice.actions.getCartSummary());
  }, []);

  const handleQuantity = (operation, product) => {
    if (operation === "minus") {
      dispatch(
        ProductSlice.actions.addToCart({
          ...product?.productInfo?.product,
          quantity: product.quantity - 1,
        })
      );
    } else {
      dispatch(
        ProductSlice.actions.addToCart({
          ...product?.productInfo?.product,
          quantity: product.quantity + 1,
        })
      );
    }
  };

  useEffect(() => {
    const products = state?.cartSummary?.products;
    if (products?.length > 1) {
      setTotalProductsQty(products.reduce((a, b) => a.quantity + b.quantity));
      setTotalAmount(products.reduce((a, b) => a?.amount + b?.amount));
    } else if (products?.length === 1) {
      setTotalProductsQty(products[0].quantity);
      setTotalAmount(products[0].quantity * products[0].price);
    }
  }, [state?.cartSummary?.products]);

  const handleRemoveFromCart = (prodId) => {
    dispatch(CartSlice.actions.removeFromCart(prodId));
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  console.log(products, "[PRODUCTS]");

  return (
    <Grid container spacing={0} marginTop="5rem">
      {state?.cartSummary?.products.length > 0 ? (
        <>
          <CustomLoader show={state.isLoading} />
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
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleProductClick(product?.productInfo?.product)
                            }
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="h6" gutterBottom>
                            {product?.productInfo?.product?.name}
                          </Typography>

                          {formatCurrencyToIndianRupees(
                            product?.productInfo?.product?.price
                          )}
                          <Tooltip title="Remove Item">
                            <IconButton
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                              }}
                              onClick={() =>
                                handleRemoveFromCart(
                                  product?.productInfo?.product?._id
                                )
                              }
                            >
                              <CloseIcon color="primary" />
                            </IconButton>
                          </Tooltip>

                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              width: "100%",
                            }}
                          >
                            <Button
                              onClick={() => handleQuantity("minus", product)}
                            >
                              <RemoveIcon />
                            </Button>
                            <Button>{product?.quantity}</Button>
                            <Button
                              onClick={() => handleQuantity("plus", product)}
                            >
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
              <Typography className={classes.subTotal}>
                Order Summary
              </Typography>
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
        </>
      ) : (
        <>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Alert severity="info">
              Looks like you don't have any items in your cart —{" "}
              <strong
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Continue shopping !!
              </strong>
            </Alert>
          </Grid>
          <Grid item xs={3}></Grid>
        </>
      )}
    </Grid>
  );
}
