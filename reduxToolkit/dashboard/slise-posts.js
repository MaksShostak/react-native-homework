import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      photo: "",
      title: "",
      latitude: "",
      longitude: "",
      userId: "",
      name: "",
      place: "",
    },
  ],
  comments: [],
  likes: [],
};

const slicePosts = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts = payload;
    },
    delPost: (state, { payload }) => {
      state.posts = payload;
    },
    getPosts: (state, { payload }) => {
      state.posts = payload;
    },
    getUsersPosts: (state, { payload }) => {
      state.posts = payload;
    },
    createComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),

    getComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    addLikes: (state, { payload }) => ({
      ...state,
      likes: payload,
    }),
  },
});
export default slicePosts.reducer;
export const {
  addPost,
  delPost,
  getPosts,
  getUsersPosts,
  getComments,
  createComments,
  addLikes,
} = slicePosts.actions;
