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
  const [fileError, setFileError] = useState("");
  const [tagsError, setTagsError] = useState("");

  let actualTags = [...tags];
  if (tagsValue.length > 0) {
    actualTags = distinct([...tags, tagsValue.trim()]);
  }

  const isValid = () => {
    let result = true;
    setFileError("");
    if (!file) {
      setFileError("File should be chosen.");
      result = false;
    }

    setTagsError("");
    if (actualTags.length === 0) {
      setTagsError("You should pick at least one tag.");
      result = false;
    }

    return result;
  };

  const sendData = async () => {
    if (!isValid()) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData()
      formData.append('photo', file!!);
      const data = await fileUploadMutation.mutateAsync(formData);
      const filename = data.filename;
      await createPhotoMutation.mutateAsync({tags: actualTags, filename});
      navigate(-1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        disabled={loading}
        onChange={tags => setTags(distinct<string>(tags))}
        fullWidth
        onInputChange={handleTagsInputChange}
        placeholder="Enter tags and press space or enter between"
        InputProps={{
          value: tagsValue
        }}
        error={tagsError.length > 0}
        helperText={tagsError}
        margin="normal"/>
      <MuiFileInput
        value={file}
        disabled={loading}
        onChange={file => setFile(file)}
        fullWidth margin="normal"
        error={fileError.length > 0}
        helperText={fileError}
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
