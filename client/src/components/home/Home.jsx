import { Chip, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdminProducts } from "../admin/slices/slice";
import CustomLoader from "../shared/Loader";
import CarouselLoader from "./Carousel";
import ProductCard from "./ProductCard";
import data from "../../mock.json";

function Home() {
  const adminState = useSelector(AdminProducts);
  const [products, setProducts] = useState(data.products);
  const [categories, setCategories] = useState(data.categories);

  useEffect(() => {
    if (adminState.products.length > 0) {
      setProducts(adminState.products);
      setCategories(adminState.categories);
    }
  }, [adminState]);

  return (
    <div>
      <CarouselLoader />
      <CustomLoader show={adminState.isLoading} />

      {categories.map((category) => {
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
            {products
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
      })}
    </div>
  );
}

export default Home;
