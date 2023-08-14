import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { CartSlice } from "../../cart/slices/slice";
import { updateApiResponse } from "../../home/slices/slice";
import {
  getProductInfoFromCart,
  postAddToCart,
  searchForProducts,
} from "../service/service";
import { ProductSlice, ProductState } from "../slices/slice";

function* actionAddToCart() {
  try {
    const state = yield select(ProductState);
    const data = yield call(postAddToCart, state?.addToCartProductInfo);
    yield put(CartSlice.actions.getCartSummary());
    if (state.fetchProductInfo) {
      const resp = yield call(getProductInfoFromCart, state?.selectedProductId);
      yield put(ProductSlice.actions.storeATCProductInfo(resp));
    }
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(ProductSlice.actions.updateLoadingState(false));
    if (state.navigate) {
      state.navigate("/cartSummary");
    }
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(ProductSlice.actions.updateLoadingState(false));
  }
}

function* actionGetProductInfoFromCart() {
  try {
    const state = yield select(ProductState);
    const data = yield call(getProductInfoFromCart, state?.selectedProductId);
    // yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(ProductSlice.actions.storeATCProductInfo(data));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(ProductSlice.actions.updateLoadingState(false));
  }
}

function* actionSearchProduct() {
  try {
    const state = yield select(ProductState);
    const data = yield call(searchForProducts, state?.searchText);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(ProductSlice.actions.updateLoadingState(false));
  }
}

function* addToCart() {
  yield takeLatest(ProductSlice.actions.addToCart, actionAddToCart);
}

function* productInfoCart() {
  yield takeLatest(
    ProductSlice.actions.getProductDataFromCart,
    actionGetProductInfoFromCart
  );
}

function* searchProducts() {
  yield takeLatest(ProductSlice.actions.searchProducts, actionSearchProduct);
}

export { addToCart, productInfoCart, searchProducts };
