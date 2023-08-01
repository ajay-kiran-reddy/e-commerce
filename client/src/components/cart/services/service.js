import {
  deleteData,
  fetchData,
  postData,
  updateData,
} from "../../../apiConfig/api";
import {
  CART_RESET,
  CART_SUMMARY,
  PAYMENT,
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

const makePayment = async (data) => {
  const res = await fetch(`http://localhost:5000/api/stripe/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await res.json();
  window.location.href = body.url;
  return body;
};

export {
  fetchCartSummary,
  fetchProductById,
  resetCartData,
  removeFromCart,
  makePayment,
};
