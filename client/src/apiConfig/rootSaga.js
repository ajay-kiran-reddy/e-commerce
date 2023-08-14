import { put, takeEvery, all } from "redux-saga/effects";
import {
  categoriesList,
  createCategory,
  createProduct,
  deleteCategoryById,
  deleteOrder,
  deleteProduct,
  deleteUser,
  fetchCategoryById,
  getAllOrders,
  getCloudinaryImageUrl,
  getUsersList,
  productsList,
  updateCategoryById,
  updateOrder,
  updateProductInfo,
  updateUserRole,
} from "../components/admin/sagas/saga";
import {
  cartSummary,
  makeStripePayment,
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
  searchProducts,
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
    deleteOrder(),
    getUsersList(),
    updateUserRole(),
    deleteUser(),

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
    searchProducts(),
    //user
    userInfo(),
    updateUserInfo(),

    //orders
    ordersInfo(),
    createOrderEntry(),
    makeStripePayment(),
  ]);
}
