import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "./middleware";

import { PostCreateType, PostType } from "./types/post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<PostType[], null>({
      query: () => ({
        url: "api/posts",
        method: "GET",
      }),
      providesTags: (result) => ["Posts"],
    }),

    getPostById: builder.query<PostType, string>({
      query: (id: string) => ({
        url: `api/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["Posts"],
    }),

    createPost: builder.mutation<PostType, PostCreateType>({
      query: (fields) => ({
        url: "api/posts",
        method: "POST",
        body: fields,
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation<PostType, Partial<PostCreateType>>({
      query: ({ id, ...fields }) => ({
        url: `api/posts/${id}`,
        method: "PATCH",
        body: fields,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePostById: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id: string) => ({
        url: `api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),

    fetchTags: builder.query<string[], null>({
      query: () => ({
        url: "api/posts/tags",
        method: "GET",
      }),
      providesTags: (result) => ["Posts"],
    }),
  }),
});
