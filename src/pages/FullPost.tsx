import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { PostType } from "../redux/posts/types";
import axios from "../http/axios";
import { PostSkeleton } from "../components/Post/Skeleton";

export const FullPost = () => {
  const [data, setData] = React.useState<PostType>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("Cannot get article");
        console.log(error);
        navigate("/");
      });
  }, []);

  if (!data) {
    return <PostSkeleton />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
        isEditable
      >
        <p>{data.text}</p>
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
