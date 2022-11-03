import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "./middleware";

import { UserLoginType, UserType } from "./types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    userLogin: builder.mutation<UserType, UserLoginType>({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    userRegister: builder.mutation<UserType, UserLoginType>({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    fetchUser: builder.query<UserType, null>({
      query: () => ({
        url: "api/auth/me",
        method: "GET",
      }),
      providesTags: (result) => ["Auth"],
    }),
  }),
});
