import {
  deleteData,
  fetchData,
  postData,
  updateData,
} from "../../../apiConfig/api";
import {
  ALL_ORDERS,
  ALL_USERS,
  CATEGORY,
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_CATEGORY,
  ORDERS,
  PRODUCTS,
  UPDATE_CATEGORY,
  UPDATE_ORDER,
  USER,
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

const fetchAllOrders = () => {
  return fetchData(ALL_ORDERS);
};

const updateOrderStatus = (data) => {
  return updateData(UPDATE_ORDER, data);
};

const deleteOrderApi = (id) => {
  return deleteData(`${ORDERS}/${id}`);
};

const fetchUsers = () => {
  return fetchData(ALL_USERS);
};

const updateUser = (data) => {
  return updateData(`${USER}/${data.id}`, data);
};

const deleteUserApi = (id) => {
  return deleteData(`${USER}/${id}`);
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
  fetchAllOrders,
  updateOrderStatus,
  deleteOrderApi,
  fetchUsers,
  updateUser,
  deleteUserApi,
};
