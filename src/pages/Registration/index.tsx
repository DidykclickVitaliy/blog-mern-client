import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { registerUser, userLogin } from "../../redux/auth/asyncAction";
import { selectAuth } from "../../redux/auth/selectors";
import { Navigate, useNavigate } from "react-router-dom";

type InputsType = {
  fullName: string;
  email: string;
  password: string;
};

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<InputsType>({
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(selectAuth);

  const onSubmit: SubmitHandler<InputsType> = async (values) => {
    const data = await dispatch(registerUser(values));
    await dispatch(
      userLogin({
        email: values.email,
        password: values.password,
      })
    );

    if (!data.payload) {
      return alert("Failed to register");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  // setError for validate errors from back
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("fullName", {
            required: "Enter full name, minimum length - 4",
            minLength: 4,
          })}
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type="text"
          label="Full name"
          fullWidth
        />
        <TextField
          {...register("email", {
            required: "Enter a email",
            pattern: /^\S+@\S+$/i,
          })}
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          label="E-Mail"
          fullWidth
        />
        <TextField
          {...register("password", {
            required: "Enter a password",
            minLength: 5,
          })}
          className={styles.field}
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
