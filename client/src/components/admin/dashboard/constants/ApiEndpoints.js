/**product api's end points */
const PRODUCTS = "/products";
const CREATE_PRODUCT = "/products/createProduct";
const SEARCH_PRODUCT = "/products/searchProducts";

/**Category api's end points */
const CATEGORY = "/category";
const CREATE_CATEGORY = "/category/create";
const UPDATE_CATEGORY = "/category/update";
const DELETE_CATEGORY = "/category/delete";

/**Login api's end points */
const SIGN_UP = "/auth/signup";
const SIGN_IN = "/auth/signIn";

/**MAIL API END POINTS */
const MAIL = "/mail";
const FORGET_PASSWORD = `${MAIL}/forgotPassword`;

/**Add to Cart api's end points */
const CART = "/cart";
const ADD_TO_CART = "/cart/addToCart";
const CART_SUMMARY = "/cart/summary";
const CART_RESET = "/cart/deleteCart";
const REMOVE_FROM_CART = "/cart/removeFromCart";

/**Orders api's end points */
const PAYMENT = "/stripe/payment";
const ORDERS = "/orders";
const CREATE_ORDER = "/orders/createOrder";
const ALL_ORDERS = "/orders/allOrders";
const UPDATE_ORDER = "/orders/updateOrder";

/** User Api end points*/

const USER = "/user";
const ALL_USERS = "/user/allUsers";

export {
  PRODUCTS,
  CREATE_PRODUCT,
  CATEGORY,
  CREATE_CATEGORY,
  SIGN_UP,
  SIGN_IN,
  MAIL,
  FORGET_PASSWORD,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_TO_CART,
  CART,
  CART_SUMMARY,
  USER,
  ORDERS,
  CREATE_ORDER,
  PAYMENT,
  CART_RESET,
  REMOVE_FROM_CART,
  ALL_ORDERS,
  UPDATE_ORDER,
  ALL_USERS,
  SEARCH_PRODUCT,
};
