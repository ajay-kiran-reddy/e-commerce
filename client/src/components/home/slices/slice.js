import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "AJ Stores",
  isLoading: false,
  sampleData: [],
  apiResponse: {
    message: "",
    severity: "",
    visible: false,
  },
  signUpData: {},
  signInData: {},
  userInfo: {},
  forgetPassWord: {
    email: "",
  },
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    displayWelcomeMessage: (state, action) => {
      state.message = "Welcome to AJ Stores Home Page";
    },
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    updateApiResponse: (state, action) => {
      state.apiResponse = action.payload;
    },
    storeSignUpData: (state, action) => {
      state.isLoading = true;
      state.signUpData = action.payload;
    },
    storeSignInData: (state, action) => {
      state.isLoading = true;
      state.signInData = action.payload;
    },
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    fetchUserInfo: (state) => {
      state.isLoading = true;
      const userInfoJsonObject = sessionStorage.getItem("userInfo")
        ? sessionStorage.getItem("userInfo")
        : "";

      const userInfoParsedObject = userInfoJsonObject
        ? JSON.parse(userInfoJsonObject)
        : null;

      state.userInfo = userInfoParsedObject;
      state.isLoading = false;
    },
    handleLogOutUser: (state) => {
      state.isLoading = true;
      sessionStorage.setItem("userInfo", JSON.stringify(null));
      state.apiResponse = {
        message: "You have been logged out successfully",
        severity: "success",
        visible: true,
      };
      state.isLoading = false;
      state.userInfo = null;
      window.location.reload();
    },
    forgetPassword: (state, action) => {
      state.isLoading = true;
      state.forgetPassWord = action.payload;
    },
  },
});

export const { displayWelcomeMessage, storeSampleData, updateApiResponse } =
  HomeSlice.actions;

export const homeState = (state) => state.home;

export default HomeSlice.reducer;
