import React from "react";
import { Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useAppDispatch } from "../../redux/store";
import { userLogin } from "../../redux/auth/asyncAction";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";

type InputsType = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<InputsType>({
    defaultValues: { email: "test@test.om", password: "1234" },
    mode: "onSubmit",
  });

  const { isAuth } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<InputsType> = (values) => {
    dispatch(userLogin(values));
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          {...register("email", {
            required: "Enter a email",
            pattern: /^\S+@\S+$/i,
          })}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          className={styles.field}
          type="password"
          {...register("password", {
            required: "Enter a password",
            minLength: 5,
          })}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          label="Password"
          fullWidth
        />

        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
