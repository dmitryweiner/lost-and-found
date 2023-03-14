import React, {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {MuiChipsInput} from "mui-chips-input";
import LoadingButton from '@mui/lab/LoadingButton';
import {useCreatePhotoMutation, useFileUploadMutation} from "../servises/queries";
import {distinct} from "../servises/utils";

const PhotoUploadView = () => {
  const navigate = useNavigate();
  const createPhotoMutation = useCreatePhotoMutation();
  const fileUploadMutation = useFileUploadMutation();
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagsValue, setTagsValue] = useState("");

  const sendData = async () => {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData()
        formData.append('photo', file);
        const data = await fileUploadMutation.mutateAsync(formData);
        const filename = data.filename;
        await createPhotoMutation.mutateAsync({tags, filename});
        navigate("/");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTagsInputChange = (v: string) => {
    if (v[v.length - 1] === " ") {
      setTags(distinct<string>([...tags, v.trim()]));
      setTagsValue("");
    } else {
      setTagsValue(v);
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
        onChange={tags => setTags(distinct<string>(tags))}
        fullWidth
        onInputChange={handleTagsInputChange}
        placeholder="Describe the photo by entering tags"
        InputProps={{
          value: tagsValue
        }}
        margin="normal"/>
      <MuiFileInput
        value={file}
        onChange={file => setFile(file)}
        fullWidth margin="normal"
        inputProps={{accept: "image/*"}}/>
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

export default PhotoUploadView;
