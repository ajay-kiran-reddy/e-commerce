import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { fetchUserInfo, updateUserInfoService } from "../services/service";
import { User, UserSlice } from "../slices/slice";
import { updateApiResponse } from "../../home/slices/slice";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";

function* actionGetUserInfo() {
  try {
    const data = yield call(fetchUserInfo);
    yield put(UserSlice.actions.storeUserInfo(data));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(UserSlice.actions.updateLoadingState(false));
  }
}

function* actionUpdateUserInfo() {
  try {
    const state = yield select(User);
    const data = yield call(updateUserInfoService, state?.updateUserRequest);
    const results = yield call(fetchUserInfo);
    yield put(UserSlice.actions.storeUserInfo(results));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(UserSlice.actions.updateLoadingState(false));
  }
}

function* userInfo() {
  yield takeLatest(UserSlice.actions.getUserInfo, actionGetUserInfo);
}

function* updateUserInfo() {
  yield takeLatest(UserSlice.actions.updateUserInfo, actionUpdateUserInfo);
}
export { userInfo, updateUserInfo };
