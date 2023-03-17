import React from "react";
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
import {BASE_URL} from "../servises/api";
import {styled} from "@mui/material/styles";
import {usePhotoQuery} from "../servises/queries";
import toast from "react-hot-toast";

const ListItem = styled('li')(({theme}) => ({
  marginLeft: theme.spacing(0.1),
}));

const PhotoView = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: photo, isFetching: isLoading} = usePhotoQuery(parseInt(id!!));
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
                image={`${BASE_URL}/public/${photo?.filename}`}
              />
              <CardContent>
                {photo?.Tags && photo?.Tags?.length > 0 && <>
                  <Typography variant="body1">
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
                        size="small"
                        label={tag.name}
                      />
                    </ListItem>)}
                  </Box>
                </>}
                <Box marginTop={1}>
                  <Typography variant="body1">
                    Created:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(photo?.createdAt ?? "").toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <Button size="large" onClick={() => navigate("/")}>Back</Button>
                  <Button size="large" color="warning" onClick={() => toast.error("Not implemented yet!")}>Delete</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>}
      </Grid>
    </Box>
  </Box>;
}

export default PhotoView;
