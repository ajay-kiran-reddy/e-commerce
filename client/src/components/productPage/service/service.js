import { fetchData, postData } from "../../../apiConfig/api";
import {
  ADD_TO_CART,
  CART,
  SEARCH_PRODUCT,
} from "../../admin/dashboard/constants/ApiEndpoints";

const postAddToCart = (data) => {
  return postData(ADD_TO_CART, data);
};

const getProductInfoFromCart = (productId) => {
  return fetchData(`${CART}/${productId}`);
};

const searchForProducts = (searchText) => {
  return fetchData(`${SEARCH_PRODUCT}/${searchText}`);
};

export { postAddToCart, getProductInfoFromCart, searchForProducts };
