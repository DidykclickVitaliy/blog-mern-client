import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../http/axios";
import { Tag } from "./types";

export const fetchTags = createAsyncThunk("fetchTagsStatus", async () => {
  const data = await axios
    .get<Tag[]>("/tags")
    .then((response) => response.data);

  return data;
});
