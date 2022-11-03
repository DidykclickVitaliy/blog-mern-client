import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { PostSkeleton } from "../components/Post/Skeleton";

import { PostType } from "../redux/services/types/post";
import { postApi } from "../redux/services/PostService";
import { userApi } from "../redux/services/UserService";

export const Home: React.FC = () => {
  const { data: posts, isLoading: postsLoading } =
    postApi.useFetchAllPostsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const { data: tags, isLoading: tagsLoading } = postApi.useFetchTagsQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: userData } = userApi.useFetchUserQuery(null);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(!posts ? [...Array(5)] : posts).map((post: PostType, index) =>
            postsLoading ? (
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
        <Grid xs={4} item>
          <TagsBlock items={tags ? tags : []} isLoading={tagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
