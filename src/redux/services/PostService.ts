import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { baseQuery } from "./middleware";
import {
  CommentCreateType,
  IComment,
  PostCreateType,
  IPost,
} from "./types/post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  tagTypes: ["Posts", "Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], null>({
      query: () => ({
        url: "api/posts",
        method: "GET",
      }),
      providesTags: (result) => ["Posts"],
    }),

    getPostById: builder.query<IPost, string>({
      query: (id: string) => ({
        url: `api/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["Post"],
    }),

    getPostsByTag: builder.query<IPost[], string>({
      query: (tag: string) => ({
        url: `api/posts/tags/${tag}`,
        method: "GET",
      }),
      providesTags: (result) => ["Posts"],
    }),
    createPost: builder.mutation<IPost, PostCreateType>({
      query: (fields) => ({
        url: "api/posts",
        method: "POST",
        body: fields,
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation<IPost, Partial<PostCreateType>>({
      query: ({ id, ...fields }) => ({
        url: `api/posts/${id}`,
        method: "PATCH",
        body: fields,
      }),
      invalidatesTags: ["Posts", "Post"],
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

    addComment: builder.mutation<string[], CommentCreateType>({
      query: ({ id, ...text }) => ({
        url: `api/posts/${id}/comments`,
        method: "POST",
        body: text,
      }),
      invalidatesTags: ["Post"],
    }),

    getLastComments: builder.query<IComment[], null>({
      query: () => ({
        url: "api/posts/comments",
        method: "GET",
      }),
      providesTags: (result) => ["Post"],
    }),
  }),
});
