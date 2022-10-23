import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuth } from "./redux/auth/asyncAction";
import { selectAuth } from "./redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(selectAuth);

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    // DZ 4:10:25
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
