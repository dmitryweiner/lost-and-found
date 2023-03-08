import React from 'react';
import {Outlet, Link} from "react-router-dom";
import {Container} from "@mui/material";

const Layout = () => {
  return <>
    <Container component="main" maxWidth="xs">
      <Outlet/>
    </Container>
  </>;
};

export default Layout;
