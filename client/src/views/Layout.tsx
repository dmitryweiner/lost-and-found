import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ pt: 7 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
