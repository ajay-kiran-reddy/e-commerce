import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  cartSummary: null,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    getCartSummary: (state) => {
      state.isLoading = true;
    },
    storeCartSummary: (state, action) => {
      state.cartSummary = action.payload;
      state.isLoading = false;
    },
  },
});

const Cart = (state) => state.Cart;

export { CartSlice, Cart };
