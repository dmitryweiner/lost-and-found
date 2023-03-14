import React, {useEffect, useState} from 'react';
import {API, BASE_URL} from "../servises/api";
import {Photo, Tag} from "../interfaces";
import {
  Box,
  Button, Card,
  CardActions,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {styled} from '@mui/material/styles';
import Tags from "../components/Tags";


function Home() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");

  const getPhotos = async () => {
    try {
      const photos = await API.photo.getAll(query);
      setPhotos(photos);
    } catch (e) {
      console.error(photos);
    }
  }

  const getTags = async () => {
    try {
      const tags = await API.tag.getAll();
      setTags(tags);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPhotos();
    getTags();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [query]);

  return <>
    <Box
      sx={{
        py: 1,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Upload your photos and find them instantly by clicking on tags.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => navigate("/photo")}>Upload photo</Button>
        </Stack>
      </Container>
    </Box>
    <Tags query={query} setQuery={setQuery} tags={tags}/>
    <Container sx={{
      py: 1,
    }}>
      {/* End hero unit */}
      <Grid container spacing={4}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={6} sm={4} md={4}>
            <Card
              sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
              <CardMedia
                component="img"
                image={`${BASE_URL}/public/${photo.filename}`}
              />
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>;
}

export default Home;
