import React from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Grid from "@mui/material/Grid";

import { postApi } from "../redux/services/PostService";
import { useParams } from "react-router-dom";
import { IPost } from "../redux/services/types/post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { Post } from "../components";
import { userApi } from "../redux/services/UserService";

const PostsByTag: React.FC = () => {
  const { tag } = useParams();
  const { data: posts, isLoading } = postApi.useGetPostsByTagQuery(
    tag ?? skipToken
  );
  const { data: userData } = userApi.useFetchUserQuery(null);

  return (
    <div>
      <h1 style={{ fontSize: 21 }}>
        Searching posts by #{tag?.toUpperCase()} tag
      </h1>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(!posts ? [...Array(5)] : posts).map((post: IPost, index) =>
            isLoading ? (
              <PostSkeleton key={index} />
            ) : (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={
                  post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""
                }
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
                isFullPost={false}
              />
            )
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsByTag;
