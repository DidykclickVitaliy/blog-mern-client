import React from "react";

import styles from "./AddComment.module.scss";
import { postApi } from "../../redux/services/PostService";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { CommentCreateType } from "../../redux/services/types/post";

export const AddComment: React.FC = () => {
  const [addComment] = postApi.useAddCommentMutation();
  const [text, setText] = React.useState<string>("");

  const { id: paramsId } = useParams();

  const onCreateComment = async () => {
    const comment: CommentCreateType = {
      id: paramsId as string,
      text,
    };

    await addComment(comment);
    setText("");
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={onCreateComment}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
