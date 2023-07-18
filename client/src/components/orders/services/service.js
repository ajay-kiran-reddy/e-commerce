import { fetchData, postData } from "../../../apiConfig/api";
import {
  CREATE_ORDER,
  ORDERS,
  PAYMENT,
} from "../../admin/dashboard/constants/ApiEndpoints";

const fetchOrders = () => {
  return fetchData(ORDERS);
};

const makePayment = (data) => {
  return postData(PAYMENT, data);
};

const createOrder = (data) => {
  return postData(CREATE_ORDER, data);
};

export { fetchOrders, createOrder, makePayment };
