import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import {
  handleForgetPassword,
  handleSignIn,
  handleSignUp,
} from "../service/service";
import { HomeSlice, homeState, updateApiResponse } from "../slices/slice";

function* actionSignIn() {
  try {
    const state = yield select(homeState);
    const data = yield call(handleSignIn, state?.signInData);
    yield put(HomeSlice.actions.storeUserInfo(data));
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    window.location.reload();
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(HomeSlice.actions.updateLoadingState(false));
  }
}

function* actionSignUp() {
  try {
    const state = yield select(homeState);
    const data = yield call(handleSignUp, state?.signUpData);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(HomeSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(HomeSlice.actions.updateLoadingState(false));
  }
}

function* actionForgetPassword() {
  try {
    const state = yield select(homeState);
    const data = yield call(handleForgetPassword, state?.forgetPassWord);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(HomeSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(HomeSlice.actions.updateLoadingState(false));
  }
}

function* userSignIn() {
  yield takeLatest(HomeSlice.actions.storeSignInData, actionSignIn);
}

function* userSignUp() {
  yield takeLatest(HomeSlice.actions.storeSignUpData, actionSignUp);
}

function* forgetPassword() {
  yield takeLatest(HomeSlice.actions.forgetPassword, actionForgetPassword);
}

export { userSignIn, actionSignUp, userSignUp, forgetPassword };
