import React, {useState} from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAllPhotosQuery, useAllTagsQuery} from "../servises/queries";
import Tags from "../components/Tags";
import Photos from "../components/Photos";
import routes from "../servises/routes";


function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const allPhotosQuery = useAllPhotosQuery(query);
  const allTagsQuery = useAllTagsQuery();

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
          <Button variant="contained" onClick={() => navigate(routes.photoUpload)}>Upload photo</Button>
        </Stack>
      </Container>
    </Box>
    <Tags
      isLoading={allTagsQuery.isFetching}
      query={query}
      setQuery={setQuery}
      tags={allTagsQuery.data}/>
    <Photos
      query={query}
      setQuery={setQuery}
      isLoading={allPhotosQuery.isFetching}
      photos={allPhotosQuery.data}/>
  </>;
}

export default Home;
