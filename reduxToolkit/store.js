import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth/slice-auth";

import postsReducer from "./dashboard/slise-posts";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authSlice.reducer,
  },
});
