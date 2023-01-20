import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { PostSkeleton } from "../components/Post/Skeleton";

import { IPost } from "../redux/services/types/post";
import { postApi } from "../redux/services/PostService";
import { userApi } from "../redux/services/UserService";

export const Home: React.FC = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    isSuccess,
  } = postApi.useGetAllPostsQuery(null, { refetchOnMountOrArgChange: true });
  const { data: tags, isLoading: tagsLoading } = postApi.useGetTagsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const { data: comments } = postApi.useGetLastCommentsQuery(null);
  const { data: userData } = userApi.useGetUserQuery(null);

  const [tabValue, setTabValue] = React.useState<number>(0);

  const sortedPosts =
    tabValue && posts
      ? posts.slice().sort((a, b) => b.viewsCount - a.viewsCount)
      : posts;

  const onSortPosts = (tabValue: number) => {
    setTabValue(tabValue);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabValue}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="basic tabs example"
      >
        <Tab label="New" onClick={() => onSortPosts(0)} />
        <Tab label="Popular" onClick={() => onSortPosts(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(!posts ? [...Array(5)] : sortedPosts!).map(
            (post: IPost, index: number) =>
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
          <CommentsBlock items={comments ? comments : []} isLoading={false} />
        </Grid>
      </Grid>
    </motion.div>
  );
};
