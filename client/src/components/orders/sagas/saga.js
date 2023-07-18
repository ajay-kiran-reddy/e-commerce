import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { updateApiResponse } from "../../home/slices/slice";
import { createOrder, fetchOrders, makePayment } from "../services/service";
import { Order, OrderSlice } from "../slices/slice";

function* actionGetOrders() {
  try {
    const data = yield call(fetchOrders);
    yield put(OrderSlice.actions.storeOrders(data));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(OrderSlice.actions.updateLoadingState(false));
  }
}

function* actionCreateOrder() {
  try {
    const state = yield select(Order);
    const data = yield call(createOrder, state.createOrder);
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
