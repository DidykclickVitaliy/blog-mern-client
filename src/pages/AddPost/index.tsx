import React from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../middleware/axios";
import { PostCreateType } from "../../redux/services/types/postTypes";
import { postApi } from "../../redux/services/PostService";
import { userApi } from "../../redux/services/UserService";

export const AddPost: React.FC = () => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();

  const { isError } = userApi.useFetchUserQuery(null);
  const { currentData: postData } = postApi.useGetPostByIdQuery(
    paramsId ?? skipToken
  );
  const [cratePost] = postApi.useCreatePostMutation();
  const [updatePost] = postApi.useUpdatePostMutation();

  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const isEditing = Boolean(paramsId);

  React.useEffect(() => {
    if (paramsId && postData) {
      setImageUrl(postData.imageUrl);
      setText(postData.text);
      setTitle(postData.title);
      setTags(postData.tags.join(", "));
    } else {
      setImageUrl("");
      setText("");
      setTitle("");
      setTags("");
    }
  }, [postData]);

  const onCreatePost = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fields: PostCreateType = {
      id: paramsId,
      title,
      text,
      tags: tags.split(", "),
      imageUrl,
    };

    // use catch error update back and here
    const data = isEditing
      ? await updatePost(fields).unwrap()
      : await cratePost(fields)
          .unwrap()
          .catch(({ data }) => {
            console.warn(data);
            alert(data[0].msg);
          });

    const id = isEditing ? paramsId : data!._id;

    navigate(`/posts/${id}`);
  };

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData();
      const file = event.target.files![0];

      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);

      alert("Failed to load file!");
    }
  };

  const onClickRemoveImage = () => {
    if (window.confirm("Are you sure you want to delete the image??")) {
      setImageUrl("");
    }
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options: SimpleMDEReactProps = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (isError) {
    alert("You are not authorized! Please login to create an article.");

    return <Navigate to="/login" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current?.click()}
      >
        Upload an image to post
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <form onSubmit={onCreatePost}>
        <TextField
          classes={{ root: styles.title }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          variant="standard"
          placeholder="Article title..."
          fullWidth
        />
        <TextField
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          variant="standard"
          placeholder="Tags"
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button type="submit" size="large" variant="contained">
            {isEditing ? "Save" : "Publish"}
          </Button>
          <Link to="/">
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
