import React, {useState} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, TextField
} from "@mui/material";
import PasswordField from "../PasswordField";

type PasswordChangeDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: (newPassword: string) => void;
}

const PasswordChangeDialog = ({open, handleClose, handleSave}: PasswordChangeDialogProps) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const isValid = (): boolean => {
    let result = true;

    setPasswordError("");
    if (password.length === 0) {
      setPasswordError("Password should not be empty.");
      result = false;
    }

    setPasswordRepeatError("");
    if (password !== passwordRepeat) {
      setPasswordRepeatError("Repeat password carefully.");
      result = false;
    }

    return result;
  };

  const handleSubmit = () => {
    if (!isValid()) {
      return;
    }
    handleSave(password);
  };

  return <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Changing password
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <PasswordField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passwordError.length > 0}
            helperText={passwordError}
          />
          <PasswordField
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat password"
            id="repeatPassword"
            value={passwordRepeat}
            onChange={e => setPasswordRepeat(e.target.value)}
            error={passwordRepeatError.length > 0}
            helperText={passwordRepeatError}
          />
        </Box>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button color="warning" onClick={handleSubmit} autoFocus>
        Save
      </Button>
    </DialogActions>
  </Dialog>;
};

export default PasswordChangeDialog;
