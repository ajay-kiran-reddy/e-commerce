import { fetchData, updateData } from "../../../apiConfig/api";
import { USER } from "../../admin/dashboard/constants/ApiEndpoints";

const fetchUserInfo = () => {
  return fetchData(USER);
};

const updateUserInfoService = (data) => {
  return updateData(`${USER}/${data?.userId}`, data);
};

export { fetchUserInfo, updateUserInfoService };
