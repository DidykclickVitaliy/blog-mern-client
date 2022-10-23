import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../middleware/axios";
import { TagType } from "./types";

export const fetchTags = createAsyncThunk("fetchTagsStatus", async () => {
  const { data } = await axios.get<TagType[]>("/tags");

  return data;
});
