import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orders: [],
  createOrder: null,
};

export const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    getOrders: (state) => {
      state.isLoading = true;
    },
    storeOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    getCreateOrderData: (state, action) => {
      state.createOrder = action.payload;
    },
  },
});

export const Order = (state) => state.orders;
