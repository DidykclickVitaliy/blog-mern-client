import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import { selectAuth } from "../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userLogout } from "../../redux/auth/slice";
import { selectPosts } from "../../redux/posts/selectors";

export const Header = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(userLogout());
      localStorage.removeItem("token");
    }

    if (location.pathname === "/create-post") {
      navigate("/");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/create-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
