import { deleteData, fetchData } from "../../../apiConfig/api";
import {
  CART_RESET,
  CART_SUMMARY,
  PRODUCTS,
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

export { fetchCartSummary, fetchProductById, resetCartData };
