import React, {useEffect, useState} from 'react';
import {
  Route,
  Routes, useNavigate
} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Layout from "./views/Layout";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import PhotoUploadView from "./views/PhotoUploadView";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import CameraIcon from '@mui/icons-material/PhotoCamera';
import {API} from "./servises/api";
import {User} from "./interfaces";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  const checkAuth = async () => {
    const user = await API.user.getCurrentUser();
    setUser(user);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logoutRequest = async () => {
    await API.auth.logout();
    setUser(undefined);
  };

  const handleLogout = () => {
    logoutRequest();
  };

  return <>
    <AppBar position="static">
      <Toolbar>
        <CameraIcon sx={{mr: 2}}/>
        <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
          Lost&Found
        </Typography>
        {user ?
          <>
            <Typography variant="body1" color="inherit">
              You are logged as <b>{user.login}</b>
            </Typography>
            <Button onClick={handleLogout} href="#" variant="outlined" color="secondary" sx={{my: 1, mx: 1.5}}>
              Logout
            </Button>
          </>
          :
          <Button onClick={() => navigate("/login")} href="#" variant="outlined" color="secondary" sx={{my: 1, mx: 1.5}}>
            Login
          </Button>
        }
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<LoginView/>}/>
        <Route path='/registration' element={<RegistrationView/>}/>
        <Route path='/photo' element={<PhotoUploadView/>}/>
      </Route>
    </Routes>
  </>;
}

export default App;
