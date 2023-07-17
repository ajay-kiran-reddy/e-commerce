/**product api's end points */
const PRODUCTS = "/products";
const CREATE_PRODUCT = "/products/createProduct";

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

/**Orders api's end points */
const ORDERS = "/orders";
const CREATE_ORDER = "/orders/createOrder";

/** User Api end points*/

const USER = "/user";

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
};
