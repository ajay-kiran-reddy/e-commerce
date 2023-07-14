import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdminProductsSlice, { AdminProducts } from "../admin/slices/slice";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ReactImageMagnify from "react-image-magnify";
import { Grid } from "@mui/material";
import AddToCart from "./AddToCart";
import ProductDetails from "./ProductDetails";

export default function ProductPage() {
  const { productId } = useParams();
  const state = useSelector(AdminProducts);
  const [activeImage, setActiveImage] = useState();
  const [productInfo, setProductInfo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state?.products.length > 0) {
      dispatch(AdminProductsSlice?.actions?.getProducts());
    }
  }, [state?.products]);

  useEffect(() => {
    const data = state?.products?.find((product) => product?._id === productId);
    setProductInfo(data);
  }, [productId, state?.products]);

  useEffect(() => {
    if (productInfo) {
      setActiveImage(productInfo?.images[0]);
    }
  }, [productInfo]);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div style={{ margin: "1rem" }}>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Electronics
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Mobiles
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            One Plus
          </Link>
        </Breadcrumbs>

        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div style={{ textAlign: "left" }}>
              {productInfo?.images.map((image) => {
                return (
                  <div
                    style={{
                      margin: "1rem",
                      border: "1px dotted gray",
                      borderRadius: "0.5rem",
                      width: "50px",
                      padding: "3px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveImage(image)}
                  >
                    <img
                      alt="product_image"
                      src={image}
                      width="50px"
                      height="50px"
                      backgroundSize="contain"
                      backgroundRepeat="no-repeat"
                      border="none"
                    ></img>
                  </div>
                );
              })}
            </div>
          </Grid>

          {/** Maginifying the selected image */}
          <Grid item xs={4}>
            <div>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: activeImage,
                  },
                  largeImage: {
                    src: activeImage,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
          </Grid>

          {/** Product Details  */}
          <Grid item xs={4}>
            <ProductDetails productInfo={productInfo} />
          </Grid>

          <Grid item xs={3}>
            <AddToCart productInfo={productInfo} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
