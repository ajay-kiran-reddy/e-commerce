import { put, takeEvery, all } from "redux-saga/effects";
import {
  categoriesList,
  createCategory,
  createProduct,
  deleteCategoryById,
  deleteProduct,
  fetchCategoryById,
  getAllOrders,
  getCloudinaryImageUrl,
  productsList,
  updateCategoryById,
  updateOrder,
  updateProductInfo,
} from "../components/admin/sagas/saga";
import {
  cartSummary,
  removeItemFromCart,
  resetCartInfo,
} from "../components/cart/sagas/saga";
import {
  forgetPassword,
  userSignIn,
  userSignUp,
} from "../components/home/sagas/saga";
import { createOrderEntry, ordersInfo } from "../components/orders/sagas/saga";
import {
  addToCart,
  productInfoCart,
} from "../components/productPage/sagas/saga";
import { updateUserInfo, userInfo } from "../components/userProfile/sagas/saga";

export default function* rootSaga() {
  yield all([
    // sampleSaga(),
    userSignIn(),
    userSignUp(),
    forgetPassword(),

    //admin products
    productsList(),
    createProduct(),
    updateProductInfo(),
    deleteProduct(),
    getAllOrders(),
    updateOrder(),

    //admin categories
    categoriesList(),
    createCategory(),
    getCloudinaryImageUrl(),
    fetchCategoryById(),
    updateCategoryById(),
    deleteCategoryById(),

    //product page

    addToCart(),
    productInfoCart(),
    cartSummary(),
    resetCartInfo(),
    removeItemFromCart(),
    //user
    userInfo(),
    updateUserInfo(),

    //orders
    ordersInfo(),
    createOrderEntry(),
  ]);
}
