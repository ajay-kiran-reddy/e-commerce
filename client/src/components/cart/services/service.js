import { fetchData } from "../../../apiConfig/api";
import {
  CART_SUMMARY,
  PRODUCTS,
} from "../../admin/dashboard/constants/ApiEndpoints";

const fetchCartSummary = () => {
  return fetchData(CART_SUMMARY);
};

const fetchProductById = (productId) => {
  return fetchData(`${PRODUCTS}/${productId}`);
};

export { fetchCartSummary, fetchProductById };
