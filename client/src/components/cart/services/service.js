import { deleteData, fetchData, updateData } from "../../../apiConfig/api";
import {
  CART_RESET,
  CART_SUMMARY,
  PRODUCTS,
  REMOVE_FROM_CART,
} from "../../admin/dashboard/constants/ApiEndpoints";

const fetchCartSummary = () => {
  return fetchData(CART_SUMMARY);
};

const fetchProductById = (productId) => {
  return fetchData(`${PRODUCTS}/${productId}`);
};

const resetCartData = () => {
  return deleteData(CART_RESET);
};

const removeFromCart = (productId) => {
  return updateData(REMOVE_FROM_CART, productId);
};

export { fetchCartSummary, fetchProductById, resetCartData, removeFromCart };
