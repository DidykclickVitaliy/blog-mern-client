import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";

const FullPost = React.lazy(
  () => import(/* webpackChunkName: "FullPost" */ "../pages/FullPost")
);

const AddPost = React.lazy(
  () => import(/* webpackChunkName: "AddPost" */ "../pages/AddPost")
);

const PostsByTag = React.lazy(
  () => import(/* webpackChunkName: "PostsByTag" */ "../pages/PostsByTag")
);

const Registration = React.lazy(
  () => import(/* webpackChunkName: "Registration" */ "../pages/Registration")
);

const Login = React.lazy(
  () => import(/* webpackChunkName: "Login" */ "../pages/Login")
);

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "../pages/NotFound")
);

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route
              path="posts/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FullPost />
                </Suspense>
              }
            />
            <Route
              path="posts/tag/:tag"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PostsByTag />
                </Suspense>
              }
            />
            <Route
              path="posts/:id/edit"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPost />
                </Suspense>
              }
            />
            <Route
              path="create-post"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPost />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Registration />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};
