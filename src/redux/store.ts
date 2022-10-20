import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import posts from "./posts/slice";
import tags from "./tags/slice";
import auth from "./auth/slice";

export const store = configureStore({
  reducer: {
    posts,
    tags,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;