import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import { useAppDispatch } from "../../redux/store";
import { userLogout } from "../../redux/user/slice";
import { userApi } from "../../redux/services/UserService";
import { postApi } from "../../redux/services/PostService";

export const Header: React.FC = () => {
  const { isSuccess } = userApi.useFetchUserQuery(null);
  const { data } = postApi.useGetPostByIdQuery("", { skip: true });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(userLogout());

      localStorage.removeItem("token");

      dispatch(userApi.util.resetApiState());
    }

    if (location.pathname === "/create-post") {
      navigate("/");
    }
  };

  const onClearPostData = () => {
    if (data) {
      dispatch(postApi.util.resetApiState());
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
            {isSuccess ? (
              <>
                <Link to="/create-post">
                  <Button variant="contained" onClick={onClearPostData}>
                    To write an article
                  </Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
