import { createSlice } from "@reduxjs/toolkit";

import { userApi } from "../services/UserService";
import { UserSliceState } from "../services/types/user";

const initialState: UserSliceState = {
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.userLogin.matchFulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state) => {
      state.isAuth = true;
    });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
