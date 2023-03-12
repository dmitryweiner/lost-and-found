import React, {FormEvent, useState} from 'react';
import {API} from "../servises/api";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {MuiChipsInput} from "mui-chips-input";
import {useCreatePhotoMutation, useFileUploadMutation} from "../servises/queries";
import {FileType} from "../interfaces";

const PhotoUploadView = () => {
  const navigate = useNavigate();
  const createPhotoMutation = useCreatePhotoMutation();
  const fileUploadMutation = useFileUploadMutation();
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const sendData = async () => {
    if (file) {
      try {
        const formData = new FormData()
        formData.append('photo', file);
        const data = await fileUploadMutation.mutateAsync(formData);
        const filename = data.filename;
        await createPhotoMutation.mutateAsync({tags, filename});
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendData();
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
      Photo upload
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
      <MuiChipsInput
        value={tags}
        onChange={tags => setTags(tags)}
        fullWidth
        placeholder="Describe the photo by entering tags"
        margin="normal"/>
      <MuiFileInput
        value={file}
        onChange={file => setFile(file)}
        fullWidth margin="normal"
        inputProps={{accept: "image/*"}}/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{my: 2}}
      >
        Save
      </Button>
    </Box>
  </Box>;
};

export default PhotoUploadView;
