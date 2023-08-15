import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AdminProductsSlice, { AdminProducts } from "../admin/slices/slice";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ReactImageMagnify from "react-image-magnify";
import { Grid } from "@mui/material";
import AddToCart from "./AddToCart";
import ProductDetails from "./ProductDetails";
import CustomLoader from "../shared/Loader";
import { Cart } from "../cart/slices/slice";

export default function ProductPage() {
  const { productId } = useParams();
  const state = useSelector(AdminProducts);
  const [activeImage, setActiveImage] = useState();
  const [productInfo, setProductInfo] = useState();
  const dispatch = useDispatch();
  const [hideFeatures, setHideFeatures] = useState(false);
  const cartState = useSelector(Cart);
  const [subCatObj, setSubCatObj] = useState({});
  const [catObject, setCatObject] = useState({});
  const navigate = useNavigate();

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
    getCategoryByParentId(productInfo?.category?.parentId);
  }, [productInfo]);

  const getCategoryByParentId = (parentId) => {
    console.log(parentId, "[parentId]");
    state?.categories.forEach((cat) => {
      cat?.children.forEach((child) => {
        if (child._id === parentId) {
          setSubCatObj(child);
          getParentCategoryById(child._id);
        }
      });
    });
  };

  const getParentCategoryById = (id) => {
    state?.categories.forEach((cat) => {
      cat.children.forEach((child) => {
        if (child._id === id) {
          setCatObject(cat);
        }
      });
    });
  };

  const handleBreadCrumbRouting = (route) => {
    navigate(route);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <CustomLoader show={state.isLoading || cartState.isLoading} />
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{ cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() =>
              handleBreadCrumbRouting(`/browse/${catObject?.name}`)
            }
          >
            {catObject?.name}
          </Link>
          <Link
            style={{ cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() =>
              handleBreadCrumbRouting(`/browse/${catObject?.name}`)
            }
          >
            {subCatObj?.name}
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            onClick={() =>
              handleBreadCrumbRouting(`/browse/${catObject?.name}`)
            }
            aria-current="page"
          >
            {productInfo?.category?.name}
          </Link>
        </Breadcrumbs>

        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
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
          <Grid item xs={8} md={4}>
            <div
              onMouseEnter={() => setHideFeatures(true)}
              onMouseLeave={() => setHideFeatures(false)}
            >
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
                    backgroundColor: "white",
                    position: "relative",
                  },
                }}
              />
            </div>
          </Grid>

          {/** Product Details  */}
          <Grid item xs={12} md={4}>
            {!hideFeatures && <ProductDetails productInfo={productInfo} />}
          </Grid>

          <Grid item xs={12} md={3}>
            <AddToCart productInfo={productInfo} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
