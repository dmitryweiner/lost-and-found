import React, {FormEvent, useState} from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useCurrentUserQuery, useDeleteTagMutation, useDetailedUserQuery} from "../servises/queries";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import TagDeleteDialog from "../components/TagDeleteDialog";
import {Tag} from "../interfaces";

const ListItem = styled('li')(({theme}) => ({
  marginRight: theme.spacing(0.2),
}));

const ProfileView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showTagDelete, setShowTagDelete] = useState(false);
  const [deletingTag, setDeletingTag] = useState<Tag | undefined>();
  const deleteTagMutation = useDeleteTagMutation();
  const userQuery = useDetailedUserQuery();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleTagClick = (tag: Tag) => {
    setShowTagDelete(true);
    setDeletingTag(tag);
  };

  const handleTagDelete = () => {
    if (!deletingTag) {
      return;
    }
    setShowTagDelete(false);
    deleteTagMutation.mutate(deletingTag.id);
    setDeletingTag(undefined);
  };

  const renderUserData = () => {
    if (userQuery.isFetching || !userQuery.data) {
      return <CircularProgress color="inherit"/>;
    }

    return <Stack spacing={2} sx={{my: 2}}>
      <Typography variant="body2" color="text.secondary">
        Username:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {userQuery.data!.login}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Photos:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {userQuery.data!.Photos?.length}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Tags:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0,
          m: 0,
        }}
        component="ul"
      >
        {userQuery.data!.Tags!.map((tag) => <ListItem key={tag.id}>
          <Chip
            size="medium"
            label={tag.name}
            onDelete={() => handleTagClick(tag)}
          />
        </ListItem>)}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Created:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {new Date(userQuery.data!.createdAt).toLocaleString()}
      </Typography>
    </Stack>
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
      {renderUserData()}
      <Box
        display="flex"
        justifyContent="center"
      >
        <LoadingButton
          size="large"
          variant="contained"
          loading={loading}
          disabled={loading}
          onClick={() => navigate(-1)}>
          Back
        </LoadingButton>
        <LoadingButton
          size="large"
          color="warning"
          loading={loading}
          disabled={loading}
          type="submit"
          variant="contained"
          sx={{ml: 2}}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
    <TagDeleteDialog
      open={showTagDelete}
      handleClose={() => setShowTagDelete(false)}
      handleDelete={handleTagDelete} />
  </Box>;
};

export default ProfileView;
