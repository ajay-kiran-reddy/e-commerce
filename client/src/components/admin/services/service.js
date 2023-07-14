import {
  deleteData,
  fetchData,
  postData,
  updateData,
} from "../../../apiConfig/api";
import {
  CATEGORY,
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_CATEGORY,
  PRODUCTS,
  UPDATE_CATEGORY,
} from "../dashboard/constants/ApiEndpoints";

const getImageUrlFromCloudinary = (data) => {
  return fetch("https://api.cloudinary.com/v1_1/ajaui/image/upload", {
    method: "post",
    body: data,
  }).then((res) => res.json());
};

const fetchProducts = () => {
  return fetchData(PRODUCTS);
};

const createProductApi = (data) => {
  return postData(CREATE_PRODUCT, data);
};

const updateProduct = (data) => {
  return updateData(`${PRODUCTS}/${data._id}`, data);
};

const deleteProductApi = (id) => {
  return deleteData(`${PRODUCTS}/${id}`, id);
};

const fetchCategories = (data) => {
  return fetchData(CATEGORY, data);
};

const createCategoryApi = (data) => {
  return postData(CREATE_CATEGORY, data);
};

const getCategoryById = (data) => {
  return fetchData(`${CATEGORY}/${data._id}`, data);
};

const updateCategory = (data) => {
  return updateData(`${UPDATE_CATEGORY}/${data._id}`, data);
};

const deleteCategory = (id) => {
  return deleteData(`${DELETE_CATEGORY}/${id}`, id);
};

export {
  fetchProducts,
  createProductApi,
  fetchCategories,
  createCategoryApi,
  getImageUrlFromCloudinary,
  updateProduct,
  deleteProductApi,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
