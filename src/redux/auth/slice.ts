import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchAuth, registerUser, userLogin } from "./asyncAction";
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
    // rework
    builder.addCase(registerUser.pending, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.UNLOGINED;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuth = true;
      state.status = LoginStatusEnum.LOGINED;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.REJECTED;
    });

    builder.addCase(fetchAuth.pending, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.UNLOGINED;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuth = true;
      state.status = LoginStatusEnum.LOGINED;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = {};
      state.isAuth = false;
      state.status = LoginStatusEnum.REJECTED;
    });
  },
});

export const { userLogout } = authSlice.actions;

export default authSlice.reducer;
