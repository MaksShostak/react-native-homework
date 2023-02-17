import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/slice-auth";
// import postsReduser from "./toolkit/posts/slice-contacts";

export const store = configureStore({
  reducer: {
    // posts: postsReduser,

    auth: authSlice.reducer,
  },
});
