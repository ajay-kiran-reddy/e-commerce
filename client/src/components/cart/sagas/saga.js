import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getFailureApiResponse } from "../../../constants/GlobalConstants";
import { updateApiResponse } from "../../home/slices/slice";
import { fetchCartSummary, fetchProductById } from "../services/service";
import { Cart, CartSlice } from "../slices/slice";

function* actionGetCartSummary() {
  try {
    const data = yield call(fetchCartSummary);
    const productsData = data?.cart?.products;
    const products = yield all(
      productsData.map((product) => {
        return call(fetchProductById, product?.product);
      })
    );
    const cart = data?.cart;
    const productData = cart.products.map((data, index) => {
      return {
        ...data,
        productInfo: products[index],
      };
    });
    const formattedData = { ...cart, products: productData };
    yield put(CartSlice.actions.storeCartSummary(formattedData));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(CartSlice.actions.updateLoadingState(false));
  }
}

function* cartSummary() {
  yield takeLatest(CartSlice.actions.getCartSummary, actionGetCartSummary);
}

export { cartSummary };
