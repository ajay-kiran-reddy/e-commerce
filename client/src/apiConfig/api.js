import axios from "axios";

const userInfoJsonObject = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : "";

const userInfoParsedObject = userInfoJsonObject
  ? JSON.parse(userInfoJsonObject)
  : null;

const accessToken = userInfoParsedObject?.jwtToken?.accessToken;

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const fetchData = async (paramUrl) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  let apiUrl = baseURL;
  if (paramUrl) {
    apiUrl = baseURL + paramUrl;
  }
  const response = await axios.get(apiUrl, config);
  return response.data;
};

const postData = async (paramUrl, request) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  let apiUrl = baseURL;
  if (paramUrl) {
    apiUrl = baseURL + paramUrl;
  }
  const response = await axios.post(apiUrl, request, config);
  return response.data;
};

const updateData = async (paramUrl, request) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  let apiUrl = baseURL;
  if (paramUrl) {
    apiUrl = baseURL + paramUrl;
  }
  const response = await axios.put(apiUrl, request, config);
  return response.data;
};

const deleteData = async (paramUrl) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  let apiUrl = baseURL;
  if (paramUrl) {
    apiUrl = baseURL + paramUrl;
  }
  const response = await axios.delete(apiUrl, config);
  return response.data;
};

export { fetchData, postData, updateData, deleteData };
