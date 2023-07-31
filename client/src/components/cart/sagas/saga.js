import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { updateApiResponse } from "../../home/slices/slice";
import {
  fetchCartSummary,
  fetchProductById,
  removeFromCart,
  resetCartData,
} from "../services/service";
import { Cart, CartSlice } from "../slices/slice";

function* actionGetCartSummary() {
  try {
    const data = yield call(fetchCartSummary);
    yield put(CartSlice.actions.storeCartSummary(data?.cart));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(CartSlice.actions.updateLoadingState(false));
  }
}

function* actionResetCartInformation() {
  try {
    yield call(resetCartData);
    yield put(CartSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(CartSlice.actions.updateLoadingState(false));
  }
}

function* actionRemoveItemFromCart() {
  try {
    const state = yield select(Cart);
    const result = yield call(removeFromCart, {
      productId: state?.removeProductId,
    });
    const data = yield call(fetchCartSummary);
    yield put(CartSlice.actions.storeCartSummary(data?.cart));
    yield put(updateApiResponse(getSuccessApiResponse(result)));
    yield put(CartSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(CartSlice.actions.updateLoadingState(false));
  }
}

function* cartSummary() {
  yield takeLatest(CartSlice.actions.getCartSummary, actionGetCartSummary);
}

function* resetCartInfo() {
  yield takeLatest(CartSlice.actions.resetCartData, actionResetCartInformation);
}

function* removeItemFromCart() {
  yield takeLatest(CartSlice.actions.removeFromCart, actionRemoveItemFromCart);
}

export { cartSummary, resetCartInfo, removeItemFromCart };
