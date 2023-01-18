import { createSlice } from "@reduxjs/toolkit";

import { userApi } from "../services/UserService";
import { UserSliceState } from "../services/types/user";

const initialState: UserSliceState = {
  isAuth: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout(state) {
      state.isAuth = false;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.userLogin.matchFulfilled, (state) => {
      state.isAuth = true;
      state.token = localStorage.getItem("token");
    });
    builder.addMatcher(userApi.endpoints.fetchUser.matchFulfilled, (state) => {
      state.isAuth = true;
      state.token = localStorage.getItem("token");
    });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
