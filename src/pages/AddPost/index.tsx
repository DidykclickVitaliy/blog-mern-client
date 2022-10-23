import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/selectors";
import axios from "../../middleware/axios";

export const AddPost = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { id: paramsId } = useParams();

  // make it better with interface and fields state
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [text, setText] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const isEditing = Boolean(paramsId);

  React.useEffect(() => {
    if (paramsId) {
      axios
        .get(`/posts/${paramsId}`)
        .then(({ data }) => {
          // make 1 state for this  fields
          setImageUrl(data.imageUrl);
          setText(data.text);
          setTitle(data.title);
          setTags(data.tags.join(", "));
        })
        .catch((error) => {
          console.warn(error);
          alert("Failed to get article");
        });
    }
  }, []);

  const onCreatePost = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const fields = {
        title,
        text,
        tags: tags.split(", "),
        imageUrl,
      };

      // const { data } = await axios.post("/posts", fields);
      const { data } = isEditing
        ? await axios.patch(`/posts/${paramsId}`, fields)
        : await axios.post("/posts", fields);

      const id = isEditing ? paramsId : data._id;
      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn(error);
      alert("Unable to create article!");
    }
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

  if (!localStorage.getItem("token") && !isAuth) {
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
        Загрузить превью
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
            Удалить
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
          placeholder="Заголовок статьи..."
          fullWidth
        />
        <TextField
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          variant="standard"
          placeholder="Тэги"
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
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
