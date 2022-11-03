import React from "react";
import { Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useAppSelector } from "../../redux/store";
import { userApi } from "../../redux/services/UserService";
import { UserLoginType } from "../../redux/services/types/user";
import { selectUserData } from "../../redux/user/selectors";

export const Login: React.FC = () => {
  const [userLogin] = userApi.useUserLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<UserLoginType>({
    defaultValues: { email: "gm@gm.gm", password: "qwerty1" },
    mode: "all",
  });
  const { isAuth } = useAppSelector(selectUserData);

  const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
    const token: string | void = await userLogin(values)
      .unwrap()
      .then((payload) => payload.token)
      .catch(({ data }) => {
        console.warn(data);

        if (isValid && data.message) {
          return alert(data.message);
        }

        return alert(`Failed to login. ${data[0].msg}`);
      });

    token && localStorage.setItem("token", token as string);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign in to your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          {...register("email", {
            required: "Enter a email",
            pattern: {
              value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
              message: "Please enter a valid email.",
            },
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
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
              message:
                "Minimum 5 characters, at least one letter and one number",
            },
          })}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
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
          Login
        </Button>
      </form>
    </Paper>
  );
};
