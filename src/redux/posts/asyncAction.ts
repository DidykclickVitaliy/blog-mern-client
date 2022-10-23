import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../middleware/axios";
import { PostType } from "./types";

export const fetchPosts = createAsyncThunk("fetchPostsStatus", async () => {
  const { data } = await axios.get<PostType[]>("/posts");

  return data;
});

export const removePost = createAsyncThunk<string, string>(
  "removePostStatus",
  async (id) => await axios.delete(`/posts/${id}`)
);
