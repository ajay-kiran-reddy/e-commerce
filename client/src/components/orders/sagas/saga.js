import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { fetchProductById } from "../../cart/services/service";
import { CartSlice } from "../../cart/slices/slice";
import { updateApiResponse } from "../../home/slices/slice";
import { createOrder, fetchOrders, makePayment } from "../services/service";
import { Order, OrderSlice } from "../slices/slice";

function* actionGetOrders() {
  try {
    const data = yield call(fetchOrders);
    /** TODO :- make product data coming from backend with out making another api call for product details */

    yield put(OrderSlice.actions.storeOrders(data.orders));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(OrderSlice.actions.updateLoadingState(false));
  }
}

function* actionCreateOrder() {
  try {
    const state = yield select(Order);
    const data = yield call(createOrder, state.createOrder);
    yield put(CartSlice.actions.resetCartData());
    yield put(CartSlice.actions.getCartSummary());
    yield put(updateApiResponse(getSuccessApiResponse(data)));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(OrderSlice.actions.updateLoadingState(false));
  }
}

function* ordersInfo() {
  yield takeLatest(OrderSlice.actions.getOrders, actionGetOrders);
}

function* createOrderEntry() {
  yield takeLatest(OrderSlice.actions.getCreateOrderData, actionCreateOrder);
}

export { ordersInfo, createOrderEntry };
