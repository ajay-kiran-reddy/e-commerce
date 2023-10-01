import { Chip, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AdminProducts } from "../admin/slices/slice";
import CustomLoader from "../shared/Loader";
import CarouselLoader from "./Carousel";
import ProductCard from "./ProductCard";

function Home() {
  const adminState = useSelector(AdminProducts);

  return (
    <div>
      <CarouselLoader />
      <CustomLoader show={adminState.isLoading} />

      {adminState.isLoading ? (
        <Grid
          container
          spacing={3}
          style={{
            paddingLeft: "1rem",
            marginTop: "0.5rem",
            paddingRight: "1rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
            return (
              <Grid item xs={12} md={4} lg={2}>
                <Skeleton
                  animation="wave"
                  height={200}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        adminState.categories.map((category) => {
          return (
            <Grid
              container
              spacing={3}
              key={category._id}
              style={{
                paddingLeft: "1rem",
                marginTop: "0.5rem",
                paddingRight: "1rem",
              }}
            >
              <Grid item xs={12}>
                <Chip
                  label={`Best Of ${category.name}`}
                  color="primary"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                />
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
                    <Grid item xs={6} md={4} lg={2}>
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
            </Grid>
          );
        })
      )}
    </div>
  );
}

export default Home;
