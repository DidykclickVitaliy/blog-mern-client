import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import TopBarProgress from "react-topbar-progress-indicator";

import { Header } from "../components";

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const [topBar, setTopBar] = React.useState(true);
  const [prevLocation, setPrevLocation] = React.useState("");

  React.useEffect(() => {
    setPrevLocation(pathname);
    setTopBar(true);

    if (pathname === prevLocation) {
      setPrevLocation("");
    }
  }, [pathname]);

  React.useEffect(() => {
    setTopBar(false);
  }, [prevLocation]);

  return (
    <>
      {topBar && <TopBarProgress />}
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};
