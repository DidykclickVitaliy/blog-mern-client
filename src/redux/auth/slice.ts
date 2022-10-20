import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userLogin } from "./asyncAction";
import { AuthSliceState, LoginStatusEnum } from "./types";

const initialState: AuthSliceState = {
  data: {},
  isAuth: false,
  status: LoginStatusEnum.UNLOGINED,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout(state) {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.UNLOGINED;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.UNLOGINED;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuth = true;
      state.status = LoginStatusEnum.LOGINED;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.REJECTED;
    });
  },
});

export const { userLogout } = authSlice.actions;

export default authSlice.reducer;
