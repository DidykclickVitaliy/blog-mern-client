import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../middleware/axios";

export const userLogin = createAsyncThunk<object, Record<string, string>>(
  "userLoginStatus",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);

    localStorage.setItem("token", data.token);

    return data.userData;
  }
);

export const registerUser = createAsyncThunk<object, Record<string, string>>(
  "registerUserStatus",
  async (params) => {
    const { data } = await axios.post("auth/register", params);

    return data;
  }
);

export const fetchAuth = createAsyncThunk("fetchAuthStatus", async () => {
  const { data } = await axios.get("/auth/me");

  return data;
});
