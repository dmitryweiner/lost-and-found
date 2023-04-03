import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useDeletePhotoMutation, usePhotoQuery} from "../servises/queries";
import PhotoDeleteDialog from "../components/dialogs/PhotoDeleteDialog";
import {getPhotoUrl} from "../servises/utils";

const ListItem = styled('li')(({theme}) => ({
  marginLeft: theme.spacing(0.1),
}));

const PhotoView = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: photo, isFetching: isLoading} = usePhotoQuery(parseInt(id!!));
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const deletePhotoMutation = useDeletePhotoMutation();

  const handleDelete = () => {
    (async () => {
      await deletePhotoMutation.mutateAsync(parseInt(id!!));
      navigate(-1);
    })();
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
      Photo details
    </Typography>
    <Box component="div" sx={{mt: 1}}>
      <Grid container spacing={4}>
        {isLoading ?
          <Grid item xs={12} justifyContent="center" sx={{display: "flex"}}>
            <CircularProgress color="inherit"/>
          </Grid>
          :
          <Grid item xs={12}>
            <Card
              sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
              <CardMedia
                component="img"
                image={getPhotoUrl(photo?.filename)}
              />
              <CardContent>
                {photo?.Tags && photo?.Tags?.length > 0 && <>
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
                      mt: 0.1
                    }}
                    component="ul"
                  >
                    {photo?.Tags?.map((tag) => <ListItem key={tag.id}>
                      <Chip
                        size="medium"
                        label={tag.name}
                      />
                    </ListItem>)}
                  </Box>
                </>}
                <Box marginTop={1}>
                  <Typography variant="body2" color="text.secondary">
                    Created:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(photo?.createdAt ?? "").toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate(-1)}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setDeleteDialogVisible(true)}
                    sx={{ml: 1}}>
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>}
      </Grid>
    </Box>
    <PhotoDeleteDialog
      open={deleteDialogVisible}
      handleClose={() => setDeleteDialogVisible(false)}
      handleDelete={handleDelete}
    />
  </Box>;
}

export default PhotoView;
