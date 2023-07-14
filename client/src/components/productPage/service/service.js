import { fetchData, postData } from "../../../apiConfig/api";
import {
  ADD_TO_CART,
  CART,
} from "../../admin/dashboard/constants/ApiEndpoints";

const postAddToCart = (data) => {
  return postData(ADD_TO_CART, data);
};

const getProductInfoFromCart = (productId) => {
  return fetchData(`${CART}/${productId}`);
};

export { postAddToCart, getProductInfoFromCart };
