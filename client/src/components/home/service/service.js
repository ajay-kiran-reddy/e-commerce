import { postData } from "../../../apiConfig/api";
import {
  FORGET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
} from "../../admin/dashboard/constants/ApiEndpoints";

const handleSignUp = (data) => {
  return postData(SIGN_UP, data);
};

const handleSignIn = (data) => {
  return postData(SIGN_IN, data);
};

const handleForgetPassword = (data) => {
  return postData(FORGET_PASSWORD, data);
};
export { handleSignUp, handleSignIn, handleForgetPassword };
