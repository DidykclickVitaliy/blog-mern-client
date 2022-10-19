import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../http/axios";
import { Post } from "./types";

export const fetchPosts = createAsyncThunk("fetchPostsStatus", async () => {
  const data = await axios
    .get<Post[]>("/posts")
    .then((response) => response.data);

  return data;
});
