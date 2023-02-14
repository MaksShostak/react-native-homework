import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import storage from "redux-persist/lib/storage";

import { authSlice } from "./auth/slice-auth";
// import postsReduser from "./toolkit/posts/slice-contacts";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["token"],
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReduser);

export const store = configureStore({
  reducer: {
    // posts: postsReduser,
    // auth: persistedAuthReducer,
    auth: authSlice.reducer,
  },
  //   middleware: (gedDefaultMiddlewares) =>
  //     gedDefaultMiddlewares({
  //       serializableCheck: {
  //         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }),
});

// export const persistor = persistStore(store);
