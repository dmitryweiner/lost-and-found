import React, {FormEvent, useState} from 'react';
import {Box, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const ProfileView = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return <Box
    sx={{
      marginTop: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography component="h1" variant="h4">
      User profile
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
      <LoadingButton
        loading={loading}
        disabled={loading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{my: 2}}
      >
        Save
      </LoadingButton>
    </Box>
  </Box>;
};

export default ProfileView;
