import { Button, Chip, Grid, Paper, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  calculateDiscountPercentage,
  formatCurrencyToIndianRupees,
} from "../../utils/globalUtils";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { ProductSlice } from "../productPage/slices/slice";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";

const useStyles = makeStyles({
  root: {
    minHeight: "400px",
    maxHeight: "400px",
    // minWidth: "300px",
    // maxWidth: "300px",
    position: "relative",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
  productName: { marginLeft: "10%", marginRight: "10%", fontSize: 14 },
  addToCartContainer: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    transition: "width 2s height 4s",
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddToCart, setShowAddToCart] = useState(false);

  const routeToProductPage = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Grid container className={classes.root}>
      <Paper
        elevation={2}
        style={{ cursor: "pointer" }}
        onMouseOver={() => setShowAddToCart(true)}
        onMouseOut={() => setShowAddToCart(false)}
        onClick={routeToProductPage}
      >
        <Grid item xs={12}>
          <div
            style={{
              backgroundImage: `url(${product.thumbnail})`,
              width: "200px",
              height: "200px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              border: "none",
            }}
          ></div>

          <Typography className={classes.productName}>
            {product.name}
          </Typography>

          {formatCurrencyToIndianRupees(product.price)}
          {formatCurrencyToIndianRupees(product.mrp, null, true)}

          <Chip
            label={calculateDiscountPercentage(product) + "%"}
            style={{
              color: "white",
              backgroundColor: APP_ACTION_COLORS.green,
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          />

          <Slide direction="up" in={showAddToCart} mountOnEnter unmountOnExit>
            <div className={classes.addToCartContainer}>
              <Button
                startIcon={<AddShoppingCart />}
                variant="contained"
                onClick={(event) => {
                  dispatch(ProductSlice.actions.addToCart(product));
                  event.stopPropagation();
                }}
              >
                Add To Cart
              </Button>
            </div>
          </Slide>
        </Grid>
      </Paper>
    </Grid>
  );
}
