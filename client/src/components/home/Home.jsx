import { Grid, Typography } from "@mui/material";
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
    dispatch(AdminProductsSlice.actions.fetchCategories());
  }, []);

  return (
    <>
      <CarouselLoader />
      <CustomLoader show={adminState.isLoading} />
      {adminState.categories?.map((category) => {
        return (
          <Grid
            container
            spacing={3}
            key={category._id}
            style={{ marginTop: "0.5rem" }}
          >
            <Grid
              item
              xs={12}
              style={{ textAlign: "left", marginLeft: "1rem" }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Best Of {category.name}
              </Typography>
            </Grid>
            {/** Find category children id where it matches with product parent id */}
            {adminState?.products
              ?.filter(
                (product) =>
                  product.category.parentId ===
                  category?.children?.find(
                    (cat) => cat._id === product.category.parentId
                  )?._id
              )
              .slice(0, 5)
              .map((product) => {
                return (
                  <Grid item xs={12} md={6} lg={2}>
                    <ProductCard product={product} />
                  </Grid>
                );
              })}
          </Grid>
        );
      })}
    </>
  );
}

export default Home;
