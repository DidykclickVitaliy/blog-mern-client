import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { PostSkeleton } from "../components/Post/Skeleton";
import { postApi } from "../redux/services/PostService";
import { userApi } from "../redux/services/UserService";

const FullPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, isError, isSuccess } =
    postApi.useGetPostByIdQuery(`${id}`);
  const { data: userData } = userApi.useGetUserQuery(null);

  if (isError) {
    alert("Cannot get article");
    console.log(error);

    navigate("/");
  }

  if (isLoading || !data) {
    return <PostSkeleton />;
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost={true}
        isEditable={userData?._id === data.user._id}
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={data.comments} isLoading={false}>
        <AddComment />
      </CommentsBlock>
    </motion.div>
  );
};

export default FullPost;
