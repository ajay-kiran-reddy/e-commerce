import { Button, Grid, Paper, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatCurrencyToIndianRupees } from "../../utils/globalUtils";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

const useStyles = makeStyles({
  root: {
    minHeight: "450px",
    maxHeight: "450px",
    minWidth: "300px",
    maxWidth: "300px",
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
          <img
            alt="product_image"
            src={product.thumbnail}
            width="100%"
            maxHeight="300px"
            height="300px"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            border="none"
            minWidth="100%"
          ></img>
          <Typography className={classes.productName}>
            {product.name}
          </Typography>

          {formatCurrencyToIndianRupees(product.price)}

          <Slide direction="up" in={showAddToCart} mountOnEnter unmountOnExit>
            <div className={classes.addToCartContainer}>
              <Button startIcon={<AddShoppingCart />} variant="contained">
                Add To Cart
              </Button>
            </div>
          </Slide>
        </Grid>
      </Paper>
    </Grid>
  );
}
