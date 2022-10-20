import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../http/axios";
import { PostType } from "./types";

export const fetchPosts = createAsyncThunk("fetchPostsStatus", async () => {
  const { data } = await axios.get<PostType[]>("/posts");

  return data;
});
