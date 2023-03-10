import React from 'react';
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const Layout = () => {
  return <>
    <Container component="main" maxWidth="md">
      <Outlet/>
    </Container>
  </>;
};

export default Layout;
