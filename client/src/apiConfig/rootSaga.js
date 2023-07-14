import { put, takeEvery, all } from "redux-saga/effects";
import {
  categoriesList,
  createCategory,
  createProduct,
  deleteCategoryById,
  deleteProduct,
  fetchCategoryById,
  getCloudinaryImageUrl,
  productsList,
  updateCategoryById,
  updateProductInfo,
} from "../components/admin/sagas/saga";
import { cartSummary } from "../components/cart/sagas/saga";
import {
  forgetPassword,
  userSignIn,
  userSignUp,
} from "../components/home/sagas/saga";
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

    //user
    userInfo(),
    updateUserInfo(),
  ]);
}
