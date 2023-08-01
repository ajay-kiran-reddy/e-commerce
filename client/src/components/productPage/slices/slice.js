import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addToCartProductInfo: null,
  ATCProductInfo: null,
  selectedProductId: "",
  navigate: null,
  fetchProductInfo: false,
};

export const ProductSlice = createSlice({
  name: "ProductState",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    addToCart: (state, action) => {
      state.isLoading = true;
      const data = action.payload;
      state.navigate = data?.navigate;
      const apiReqBody = {
        products: {
          product: data?._id,
          price: data?.price,
          quantity: data?.quantity || 1,
          operation: data?.operation,
        },
      };
      state.fetchProductInfo = data.fetchProductInfo;
      state.addToCartProductInfo = apiReqBody;
    },
    getProductDataFromCart: (state, action) => {
      state.isLoading = true;
      state.selectedProductId = action.payload;
    },
    storeATCProductInfo: (state, action) => {
      state.ATCProductInfo = action.payload.product;
      state.isLoading = false;
    },
    resetProductInfo: (state, action) => {
      state.fetchProductInfo = false;
    },
  },
});

export const ProductState = (state) => state.ProductState;
