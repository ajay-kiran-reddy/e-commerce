import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants/GlobalConstants";
import { updateApiResponse } from "../../home/slices/slice";
import {
  createCategoryApi,
  createProductApi,
  deleteCategory,
  deleteProductApi,
  fetchAllOrders,
  fetchCategories,
  fetchProducts,
  getCategoryById,
  getImageUrlFromCloudinary,
  updateCategory,
  updateOrderStatus,
  updateProduct,
} from "../services/service";
import AdminProductsSlice, { AdminProducts } from "../slices/slice";

function* actionFetchProducts() {
  try {
    const data = yield call(fetchProducts);
    yield put(AdminProductsSlice.actions.storeProducts(data));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
  }
}

function* actionCreateProduct() {
  try {
    const state = yield select(AdminProducts);
    const request = { ...state.createProduct };
    // request.images = state.imageUrls;
    const data = yield call(createProductApi, request);
    const formattedData = getSuccessApiResponse(data);
    yield put(updateApiResponse(formattedData));
    const products = yield call(fetchProducts);
    yield put(AdminProductsSlice.actions.storeProducts(products));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
    yield put(AdminProductsSlice.actions.storeImageFileUrls([]));
    yield put(AdminProductsSlice.actions.resetData());
  } catch (e) {
    console.log(e, "[EROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionUpdateProduct() {
  try {
    const state = yield select(AdminProducts);
    const request = { ...state.updateProduct };
    // request.images = state.imageUrls ? state.imageUrls : request.images;
    const data = yield call(updateProduct, request);
    const formattedData = getSuccessApiResponse(data);
    yield put(updateApiResponse(formattedData));
    const products = yield call(fetchProducts);
    yield put(AdminProductsSlice.actions.storeProducts(products));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
    yield put(AdminProductsSlice.actions.storeImageFileUrls([]));
    yield put(AdminProductsSlice.actions.resetData());
  } catch (e) {
    console.log(e, "[EROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionFetchCategories() {
  try {
    const data = yield call(fetchCategories);
    yield put(AdminProductsSlice.actions.storeCategories(data));
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionAddNewCategory() {
  try {
    const state = yield select(AdminProducts);
    const request = state?.newCategory;
    const data = yield call(createCategoryApi, request);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    const categories = yield call(fetchCategories);
    yield put(AdminProductsSlice.actions.storeCategories(categories));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionFetchImageUrl() {
  try {
    const state = yield select(AdminProducts);
    const request = state.imageFilesData;
    const fileStore = [];
    fileStore.push.apply(fileStore, request);

    const results = yield all(
      fileStore.map((file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "AjayUi");
        data.append("cloud_name", "AjayUi");
        return call(getImageUrlFromCloudinary, data);
      })
    );
    yield put(
      AdminProductsSlice.actions.storeImageFileUrls(
        results.map((image) => image.url)
      )
    );
  } catch (e) {
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionDeleteProduct() {
  try {
    const state = yield select(AdminProducts);
    const request = state?.deleteProductId;
    const data = yield call(deleteProductApi, request);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    const products = yield call(fetchProducts);
    yield put(AdminProductsSlice.actions.storeProducts(products));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionFetchCategoryDataById() {
  try {
    const state = yield select(AdminProducts);
    const request = state?.targetCategoryId;
    const data = yield call(getCategoryById, request);
    yield put(AdminProductsSlice.actions.storeCategoryInfo(data));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionUpdateCategoryById() {
  try {
    const state = yield select(AdminProducts);
    const request = state?.categoryInfo;
    const data = yield call(updateCategory, request);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    const results = yield call(fetchCategories);
    yield put(AdminProductsSlice.actions.storeCategories(results));
    yield put(AdminProductsSlice.actions.closeEditCategoryModal());
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionDeleteCategoryById() {
  try {
    const state = yield select(AdminProducts);
    const request = state?.deleteCategoryId;
    const data = yield call(deleteCategory, request);
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    const results = yield call(fetchCategories);
    yield put(AdminProductsSlice.actions.storeCategories(results));
    yield put(AdminProductsSlice.actions.closeDeleteCategoryModal());
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionGetAllOrders() {
  try {
    const data = yield call(fetchAllOrders);
    yield put(AdminProductsSlice.actions.storeAllOrders(data.orders));
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* actionUpdateOrder() {
  try {
    const state = yield select(AdminProducts);
    const data = yield call(updateOrderStatus, state.updatedOrder);
    const results = yield call(fetchAllOrders);
    yield put(AdminProductsSlice.actions.storeAllOrders(results.orders));
    yield put(updateApiResponse(getSuccessApiResponse(data)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  } catch (e) {
    console.log(e, "[ERROR]");
    yield put(updateApiResponse(getFailureApiResponse(e)));
    yield put(AdminProductsSlice.actions.updateLoadingState(false));
  }
}

function* productsList() {
  yield takeLatest(AdminProductsSlice.actions.getProducts, actionFetchProducts);
}

function* createProduct() {
  yield takeLatest(
    AdminProductsSlice.actions.createProduct,
    actionCreateProduct
  );
}

function* categoriesList() {
  yield takeLatest(
    AdminProductsSlice.actions.fetchCategories,
    actionFetchCategories
  );
}

function* createCategory() {
  yield takeLatest(
    AdminProductsSlice.actions.createCategory,
    actionAddNewCategory
  );
}

function* getCloudinaryImageUrl() {
  yield takeLatest(
    AdminProductsSlice.actions.getImageFilesData,
    actionFetchImageUrl
  );
}

function* updateProductInfo() {
  yield takeLatest(
    AdminProductsSlice.actions.storeUpdateProductInfo,
    actionUpdateProduct
  );
}

function* deleteProduct() {
  yield takeLatest(
    AdminProductsSlice.actions.handleDeleteProduct,
    actionDeleteProduct
  );
}

function* fetchCategoryById() {
  yield takeLatest(
    AdminProductsSlice.actions.getCategoryDataById,
    actionFetchCategoryDataById
  );
}

function* updateCategoryById() {
  yield takeLatest(
    AdminProductsSlice.actions.updateCategory,
    actionUpdateCategoryById
  );
}

function* deleteCategoryById() {
  yield takeLatest(
    AdminProductsSlice.actions.deleteCategory,
    actionDeleteCategoryById
  );
}

function* getAllOrders() {
  yield takeLatest(
    AdminProductsSlice.actions.fetchAllOrders,
    actionGetAllOrders
  );
}

function* updateOrder() {
  yield takeLatest(AdminProductsSlice.actions.updateOrder, actionUpdateOrder);
}

export {
  productsList,
  createProduct,
  categoriesList,
  createCategory,
  getCloudinaryImageUrl,
  updateProductInfo,
  deleteProduct,
  fetchCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllOrders,
  updateOrder,
};
