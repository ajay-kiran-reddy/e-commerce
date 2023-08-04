import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AdminProducts } from "../admin/slices/slice";
import CustomLoader from "../shared/Loader";
import CarouselLoader from "./Carousel";
import ProductCard from "./ProductCard";
import { homeState } from "./slices/slice";

function Home() {
  const adminState = useSelector(AdminProducts);

  return (
    <div>
      <CarouselLoader />
      <CustomLoader show={adminState.isLoading} />
      {adminState.categories.map((category) => {
        return (
          <Grid
            container
            spacing={3}
            key={category._id}
            style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}
          >
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <Typography variant="h6" gutterBottom color="primary">
                Best Of {category.name}
              </Typography>
            </Grid>
            {/** Find category children id where it matches with product parent id */}
            {adminState?.products
              .filter(
                (product) =>
                  product.category.parentId ===
                  category.children?.find(
                    (cat) => cat._id === product.category.parentId
                  )?._id
              )
              .slice(0, 6)
              .map((product) => {
                return (
                  <Grid item xs={12} md={4} lg={2}>
                    <ProductCard product={product} />
                  </Grid>
                );
              })}
          </Grid>
        );
      })}
    </div>
  );
}

export default Home;
