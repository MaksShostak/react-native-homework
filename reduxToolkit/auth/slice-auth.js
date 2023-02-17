import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  userId: "",
  isLogin: false,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      name: payload.name,
      email: payload.email,
      userId: payload.userId,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      isLogin: payload.isLogin,
    }),
    authLogoutUser: () => initialState,
  },
});
