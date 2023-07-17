import { fetchData, postData } from "../../../apiConfig/api";
import {
  CREATE_ORDER,
  ORDERS,
} from "../../admin/dashboard/constants/ApiEndpoints";

const fetchOrders = () => {
  return fetchData(ORDERS);
};

const createOrder = (data) => {
  return postData(CREATE_ORDER, data);
};

export { fetchOrders, createOrder };
