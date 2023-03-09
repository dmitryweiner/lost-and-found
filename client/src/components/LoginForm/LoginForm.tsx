import {FormEvent, useState} from "react";
import {Avatar, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate} from "react-router-dom";

export type LoginFormData = {
  login: string;
  password: string;
}

type FormProps = {
  onSubmit: (data: LoginFormData) => void;
}

export default function LoginForm({onSubmit}: FormProps) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* TODO: use final-form */
  const isValid = (): boolean => {
    let result = true;

    setLoginError("");

    if (!/^([a-z0-9]{6,20})$/.test(login)) {
      setLoginError("Login should be from 6 to 20 chars and consist of latin letters and numbers.");
      result = false;
    }

    if (login.length === 0) {
      setLoginError("Login should not be empty.");
      result = false;
    }

    setPasswordError("");
    if (password.length === 0) {
      setPasswordError("Password should not be empty.");
      result = false;
    }

    return result;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValid()) {
      onSubmit({
        login,
        password
      });
    }
  };

  return <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
      <LockOutlinedIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      Login
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Login"
        name="login"
        autoComplete="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
        error={loginError.length > 0}
        helperText={loginError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={passwordError.length > 0}
        helperText={passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
      >
        Login
      </Button>
      <Grid container>
        <Grid item>
          <Link onClick={() => navigate("/registration")} href="#" variant="body2">
            Don't have an account? Register
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>;
}
