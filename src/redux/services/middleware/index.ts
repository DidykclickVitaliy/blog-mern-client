import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem("token");

  if (token) {
    headers.set("Authorization", token);
  }

  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4444/",
  prepareHeaders,
});
