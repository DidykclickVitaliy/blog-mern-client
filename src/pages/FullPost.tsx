import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { PostType } from "../redux/posts/types";
import axios from "../middleware/axios";
import { PostSkeleton } from "../components/Post/Skeleton";
import { selectAuth } from "../redux/auth/selectors";
import { useAppSelector } from "../redux/store";

export const FullPost = () => {
  const [postData, setPostData] = React.useState<PostType>();
  const { data: userData } = useAppSelector(selectAuth);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        alert("Cannot get article");
        console.log(error);
        navigate("/");
      });
  }, []);

  if (!postData) {
    return <PostSkeleton />;
  }

  return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={
          postData.imageUrl ? `http://localhost:4444${postData.imageUrl}` : ""
        }
        user={postData.user}
        createdAt={postData.createdAt}
        viewsCount={postData.viewsCount}
        commentsCount={3}
        tags={postData.tags}
        isFullPost={true}
        isEditable={
          // @ts-ignore
          userData?._id === postData.user._id
        }
      >
        <ReactMarkdown children={postData.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
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
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
