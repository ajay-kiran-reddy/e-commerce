import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../home/ProductCard";
import { ProductState } from "../productPage/slices/slice";
import CustomLoader from "../shared/Loader";
import EmptyProductsScreen from "./EmptyProductsScreen";

function Search() {
  const state = useSelector(ProductState);

  return (
    <div>
      <CustomLoader show={state.isLoading} />
      <Grid
        item
        xs={12}
        md={8}
        style={{ marginTop: "1rem", padding: "0 1rem" }}
      >
        <Grid container spacing={3}>
          {state?.searchedProducts.length > 0 ? (
            state?.searchedProducts.map((product) => {
              return (
                <Grid item xs={12} md={4} lg={2}>
                  <ProductCard product={product} />
                </Grid>
              );
            })
          ) : (
            <EmptyProductsScreen name={"products"} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Search;
