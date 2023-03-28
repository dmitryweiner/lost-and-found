import React, {useState} from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Link,
  Stack,
  Typography
} from "@mui/material";
import {useDeleteTagMutation, useDetailedUserQuery, useUpdateUserMutation} from "../servises/queries";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import TagDeleteDialog from "../components/dialogs/TagDeleteDialog";
import {Tag} from "../interfaces";
import PasswordChangeDialog from "../components/dialogs/PasswordChangeDialog";

const ListItem = styled('li')(({theme}) => ({
  marginRight: theme.spacing(0.2),
}));

const ProfileView = () => {
  const navigate = useNavigate();
  const [showTagDelete, setShowTagDelete] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [deletingTag, setDeletingTag] = useState<Tag | undefined>();
  const deleteTagMutation = useDeleteTagMutation();
  const updateUserMutation = useUpdateUserMutation();
  const userQuery = useDetailedUserQuery();

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

  const handlePasswordChange = (newPassword: string) => {
    updateUserMutation.mutate({password: newPassword});
    setShowPasswordChange(false);
  };

  const renderUserData = () => {
    if (userQuery.isFetching || !userQuery.data) {
      return <CircularProgress color="inherit"/>;
    }

    return <Stack spacing={1} sx={{my: 2}}>
      <Typography variant="body2" color="text.secondary">
        Username:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {userQuery.data!.login}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Password:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        <Link
          onClick={() => setShowPasswordChange(true)}
          variant="body1">
          Change
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Photos:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {userQuery.data!.Photos?.length}
      </Typography>
      {userQuery.data!.Tags && userQuery.data!.Tags.length > 0 &&  <>
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
      </>}
      <Typography variant="body2" color="text.secondary">
        Created:
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {new Date(userQuery.data!.createdAt).toLocaleString()}
      </Typography>
      {userQuery.data!.updatedAt && <>
        <Typography variant="body2" color="text.secondary">
          Modified:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {new Date(userQuery.data!.updatedAt).toLocaleString()}
        </Typography>
      </>}
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
    <Box sx={{mt: 1}}>
      {renderUserData()}
      <Box
        display="flex"
        justifyContent="start"
      >
        <Button
          variant="contained"
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Box>
    <TagDeleteDialog
      open={showTagDelete}
      handleClose={() => setShowTagDelete(false)}
      handleDelete={handleTagDelete} />
    <PasswordChangeDialog
      open={showPasswordChange}
      handleClose={() => setShowPasswordChange(false)}
      handleSave={handlePasswordChange} />
  </Box>;
};

export default ProfileView;
