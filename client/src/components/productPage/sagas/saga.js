import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { updateApiResponse } from "../../home/slices/slice";
import { getProductInfoFromCart, postAddToCart } from "../service/service";
import { ProductSlice, ProductState } from "../slices/slice";

function* actionAddToCart() {
  try {
    const state = yield select(ProductState);
    const data = yield call(postAddToCart, state?.addToCartProductInfo);
    const results = yield call(
      getProductInfoFromCart,
      state?.addToCartProductInfo?.products?.product
    );
    yield put(ProductSlice.actions.storeATCProductInfo(results));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(ProductSlice.actions.updateLoadingState(false));
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

function* addToCart() {
  yield takeLatest(ProductSlice.actions.addToCart, actionAddToCart);
}

function* productInfoCart() {
  yield takeLatest(
    ProductSlice.actions.getProductDataFromCart,
    actionGetProductInfoFromCart
  );
}

export { addToCart, productInfoCart };
