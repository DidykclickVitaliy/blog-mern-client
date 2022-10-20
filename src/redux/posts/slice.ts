import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchPosts } from "./asyncAction";
import { PostType, PostSliceState, StatusEnum } from "./types";

const initialState: PostSliceState = {
  posts: [],
  status: StatusEnum.LOADIND,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.status = StatusEnum.LOADIND;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostType[]>) => {
        state.posts = action.payload;
        state.status = StatusEnum.SUCCESS;
      }
    );
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = StatusEnum.REJECTED;
    });
  },
});

export default postsSlice.reducer;
