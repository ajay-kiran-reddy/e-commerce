import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductsSlice, { AdminProducts } from "../admin/slices/slice";
import CustomLoader from "../shared/Loader";
import CarouselLoader from "./Carousel";
import ProductCard from "./ProductCard";
import { homeState } from "./slices/slice";

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(homeState);
  const adminState = useSelector(AdminProducts);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.getProducts());
  }, []);

  return (
    <>
      <CarouselLoader />
      <CustomLoader show={adminState.isLoading} />
      <Grid container spacing={3} style={{ margin: "0.5rem" }}>
        {adminState?.products?.map((product) => {
          return (
            <Grid item xs={3}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Home;
