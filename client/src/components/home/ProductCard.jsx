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
} from "../../utils/globalUtils";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { ProductSlice } from "../productPage/slices/slice";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";

const useStyles = makeStyles({
  root: {
    minHeight: "350px",
    maxHeight: "350px",
    position: "relative",
  },
  cardHovered: {
    transform: "scale3d(3.05, 3.05, 3)",
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
    <Paper
      elevation={2}
      style={{ cursor: "pointer" }}
      onMouseOver={() => setShowAddToCart(true)}
      onMouseOut={() => setShowAddToCart(false)}
      onClick={routeToProductPage}
    >
      <Grid container className={classes.root}>
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
            label={calculateDiscountPercentage(product) + "% off"}
            style={{
              color: "white",
              backgroundColor: APP_ACTION_COLORS.green,
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
      </Grid>
    </Paper>
  );
}
