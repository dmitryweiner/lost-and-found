import React from 'react';
import {Photo} from "../interfaces";
import {styled} from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid
} from "@mui/material";
import {BASE_URL} from "../servises/api";
import {useNavigate} from "react-router-dom";

const ListItem = styled('li')(({theme}) => ({
  marginRight: theme.spacing(0.1),
}));

type PhotosProps = {
  isLoading: boolean;
  photos?: Photo[];
  query: string;
  setQuery: (query: string) => void;
}

function Photos({photos, isLoading, query, setQuery}: PhotosProps) {
  const navigate = useNavigate();
  return <Container sx={{
    py: 1,
  }}>
    <Grid container spacing={4}>
      {isLoading ?
        <Grid item xs={12} justifyContent="center" sx={{display: "flex"}}>
          <CircularProgress color="inherit"/>
        </Grid>
        :
        <>
          {photos?.map((photo) => (
            <Grid item key={photo.id} xs={6} md={4}>
              <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
              >
                <CardMedia
                  component="img"
                  image={`${BASE_URL}/public/${photo.filename}`}
                  onClick={() => navigate(`/photo/${photo.id}`)}
                />
                <CardActions>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      listStyle: 'none',
                      p: 0,
                      m: 0,
                    }}
                    component="ul"
                  >
                    {photo.Tags?.map((tag) => <ListItem key={tag.id}>
                      <Chip
                        size="small"
                        label={tag.name}
                        onClick={() => setQuery(tag.name)}
                        color={query === tag.name ? "primary" : "default"}
                      />
                    </ListItem>)}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </>}
    </Grid>
  </Container>;
}

export default Photos;
