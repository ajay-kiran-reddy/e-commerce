import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userInfo: null,
  updateUserRequest: null,
};

export const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    getUserInfo: (state) => {
      state.isLoading = true;
    },
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    updateUserInfo: (state, action) => {
      state.isLoading = true;
      state.updateUserRequest = action.payload;
    },
  },
});

export const User = (state) => state.user;
