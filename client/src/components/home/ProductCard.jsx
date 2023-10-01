import {
  Button,
  Chip,
  Fade,
  Grid,
  Paper,
  Slide,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import {
  calculateDiscountPercentage,
  formatCurrencyToIndianRupees,
  isMobileView,
} from "../../utils/globalUtils";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { ProductSlice } from "../productPage/slices/slice";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";
import "../../index.css";

const useStyles = makeStyles({
  root: {
    minHeight: isMobileView() ? "150px" : "350px",
    position: "relative",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  cardHovered: {
    transform: "scale3d(3.05, 3.05, 3)",
  },
  productName: {
    marginLeft: "10%",
    marginRight: "10%",
    fontSize: 14,
    marginTop: "1rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
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

  const getBackGroundColor = (discount) => {
    if (discount <= 10) {
      return APP_ACTION_COLORS.blue;
    } else if (discount > 10 && discount <= 40) {
      return APP_ACTION_COLORS.green;
    } else return APP_ACTION_COLORS.pink;
  };

  return (
    <Paper
      elevation={2}
      style={{ cursor: "pointer", borderRadius: "0.5rem", backgroundColor: "" }}
      onMouseOver={() => setShowAddToCart(true)}
      onMouseOut={() => setShowAddToCart(false)}
      onClick={routeToProductPage}
      className="zoom"
    >
      <Grid container className={classes.root}>
        <Grid item xs={2} md={12}></Grid>
        <Grid item xs={6} md={12}>
          <div
            style={{
              backgroundImage: `url(${product.thumbnail})`,
              width: isMobileView() ? "120px" : "200px",
              height: isMobileView() ? "120px" : "200px",
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
            size="small"
            label={calculateDiscountPercentage(product) + "% off"}
            style={{
              color: "white",
              backgroundColor: getBackGroundColor(
                calculateDiscountPercentage(product)
              ),
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          />

          <Zoom
            style={{ transitionDelay: showAddToCart ? "200ms" : "0ms" }}
            in={showAddToCart}
            mountOnEnter
            unmountOnExit
          >
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
          </Zoom>
        </Grid>
        <Grid item xs={2} md={12}></Grid>
      </Grid>
    </Paper>
  );
}
