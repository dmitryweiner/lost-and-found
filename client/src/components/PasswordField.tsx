import React, {useState} from 'react';
import {
  TextFieldProps,
  IconButton,
  TextField,
  InputAdornment
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const PasswordField = ({InputProps, ...textFieldProps}: TextFieldProps) => {
  const [visible, setVisible] = useState(false);

  return <TextField
    type={visible ? 'text' : 'password'}
    InputProps={{
      endAdornment: <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setVisible(!visible)}
            onMouseDown={() => setVisible(!visible)}
          >
            {visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>,
      ...InputProps
    }}

    {...textFieldProps}
  />
};

export default PasswordField;
