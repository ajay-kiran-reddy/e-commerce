import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AdminProducts } from "../admin/slices/slice";
import ProductCard from "../home/ProductCard";
import { homeState, updateCurrentRef } from "../home/slices/slice";
import EmptyProductsScreen from "./EmptyProductsScreen";
import FilterCard from "./FilterCard";

export default function SearchBrowse() {
  const adminState = useSelector(AdminProducts);
  const home = useSelector(homeState);
  const params = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("activeCategory") || [];
    setCategories(JSON.parse(items));
  }, [home.currentRef]);

  const resetProducts = () => {
    setProducts(
      adminState?.products.filter(
        (product) =>
          product?.category.parentId ===
          categories.children?.find(
            (cat) => cat._id === product.category.parentId
          )?._id
      )
    );
  };

  useEffect(() => {
    resetProducts();
  }, [adminState, home.currentRef, categories]);

  useEffect(() => {
    if (home.checkedCategories.length > 0) {
      const filteredProducts = adminState?.products.filter((product) =>
        home.checkedCategories.includes(product.category._id)
      );
      setProducts(filteredProducts);
    } else {
      resetProducts();
    }
  }, [home.checkedCategories]);

  return (
    <Grid
      container
      spacing={0}
      style={{
        marginTop: "1rem",
        paddingRight: "0.5rem",
        paddingLeft: "0.5rem",
      }}
    >
      <Grid item xs={12} md={2}>
        <FilterCard products={products} />
      </Grid>
      <Grid item xs={12} md={8} style={{ marginTop: "1rem" }}>
        <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              );
            })
          ) : (
            <EmptyProductsScreen name={"products"} />
          )}
        </Grid>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}
