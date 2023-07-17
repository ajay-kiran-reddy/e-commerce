import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "./components/home/slices/slice";
import logger from "redux-logger";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./apiConfig/rootSaga";
import AdminProductsSlice from "./components/admin/slices/slice";
import { ProductSlice } from "./components/productPage/slices/slice";
import { CartSlice } from "./components/cart/slices/slice";
import { UserSlice } from "./components/userProfile/slices/slice";
import { OrderSlice } from "./components/orders/slices/slice";

const rootReducer = combineReducers({
  home: HomeSlice.reducer,
  adminProducts: AdminProductsSlice.reducer,
  ProductState: ProductSlice.reducer,
  Cart: CartSlice.reducer,
  user: UserSlice.reducer,
  orders: OrderSlice.reducer,
});

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);
