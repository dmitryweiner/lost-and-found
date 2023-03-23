import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import './App.css';
import routes from './servises/routes';
import Home from "./views/Home";
import Layout from "./views/Layout";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import PhotoUploadView from "./views/PhotoUploadView";
import PhotoView from "./views/PhotoView";
import ProfileView from "./views/ProfileView";
import CameraIcon from '@mui/icons-material/PhotoCamera';
import {useCurrentUserQuery, useLogoutMutation} from "./servises/queries";
import {User} from "./interfaces";
import PersonIcon from '@mui/icons-material/Person';


type ProtectedRouteType = {
  user?: User,
  children: JSX.Element
}

const ProtectedRoute = ({user, children}: ProtectedRouteType) => {
  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};

function App() {
  const navigate = useNavigate();
  const currentUserQuery = useCurrentUserQuery();
  const logoutMutation = useLogoutMutation();

  const user = (currentUserQuery.data && !currentUserQuery.isError) ? currentUserQuery.data : undefined;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (currentUserQuery.isFetching) {
    return <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="inherit"/>
    </Box>;
  }

  return <>
    <AppBar position="fixed">
      <Toolbar>
        <CameraIcon
          onClick={() => navigate(routes.home)}
          sx={{mr: 2}}/>
        <Typography
          onClick={() => navigate(routes.home)}
          variant="h6"
          color="inherit"
          noWrap
          sx={{flexGrow: 1}}>
          Lost&Found
        </Typography>
        {user ?
          <>
            <PersonIcon
              onClick={() => navigate(routes.profile)}/>
            <Typography
              onClick={() => navigate(routes.profile)}
              variant="body1"
              color="inherit"
              sx={{fontWeight: 'bold'}}>
              {user.login}
            </Typography>
            <Button onClick={handleLogout} href="#" variant="outlined" color="secondary" sx={{my: 1, mx: 1.5}}>
              Logout
            </Button>
          </>
          :
          <Button onClick={() => navigate(routes.login)} href="#" variant="outlined" color="secondary"
                  sx={{my: 1, mx: 1.5}}>
            Login
          </Button>
        }
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path={routes.home} element={<Layout/>}>
        <Route index element={<ProtectedRoute user={user}><Home/></ProtectedRoute>}/>
        <Route path={routes.profile} element={<ProtectedRoute user={user}><ProfileView/></ProtectedRoute>}/>
        <Route path={routes.photoUpload} element={<ProtectedRoute user={user}><PhotoUploadView/></ProtectedRoute>}/>
        <Route path={routes.photoDetails} element={<ProtectedRoute user={user}><PhotoView/></ProtectedRoute>}/>
        <Route path={routes.login} element={<LoginView/>}/>
        <Route path={routes.registration} element={<RegistrationView/>}/>
      </Route>
    </Routes>
  </>;
}

export default App;
