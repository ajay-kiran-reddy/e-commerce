import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  cartSummary: null,
  removeProductId: "",
  lineItems: [],
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
    resetCartData: (state) => {
      state.isLoading = true;
    },
    removeFromCart: (state, action) => {
      state.isLoading = true;
      state.removeProductId = action.payload;
    },
    makePayment: (state, action) => {
      state.isLoading = true;
      state.lineItems = action.payload;
    },
  },
});

const Cart = (state) => state.Cart;

export { CartSlice, Cart };
