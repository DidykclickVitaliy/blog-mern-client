import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../http/axios";

export const userLogin = createAsyncThunk<object, Record<string, string>>(
  "userLoginStatus",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);

    return data;
  }
);
