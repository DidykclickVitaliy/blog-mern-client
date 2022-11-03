import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { userApi } from "../../redux/services/UserService";
import { selectUserData } from "../../redux/user/selectors";

type InputsType = {
  fullName: string;
  email: string;
  password: string;
};

export const Registration: React.FC = () => {
  const [userRegister] = userApi.useUserRegisterMutation();
  const [userLogin] = userApi.useUserLoginMutation();
  const { isAuth } = useAppSelector(selectUserData);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<InputsType>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<InputsType> = async (values) => {
    const token: string | void = await userRegister(values)
      .unwrap()
      .then((payload) => payload.token)
      .catch(({ data }) => {
        console.warn(data);
        return alert(`Failed to register! ${data[0].msg} `);
      });

    await userLogin({
      email: values.email,
      password: values.password,
    });

    token && localStorage.setItem("token", token as string);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
            required: "Enter full name",
            minLength: {
              value: 4,
              message:
                "The length of the full name must be at least 4 characters",
            },
          })}
          placeholder="Enter your full name, please."
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
            pattern: {
              value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
              message: "Please enter a valid email.",
            },
          })}
          className={styles.field}
          placeholder="What's your email?"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="text"
          label="E-Mail"
          fullWidth
        />

        <TextField
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
          Register
        </Button>
      </form>
    </Paper>
  );
};
