import React from 'react';
import {Photo} from "../interfaces";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Container,
  Grid
} from "@mui/material";
import {BASE_URL} from "../servises/api";

type PhotosProps = {
  isLoading: boolean;
  photos?: Photo[];
}

function Photos({photos, isLoading}: PhotosProps) {
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
        </>}
    </Grid>
  </Container>;
}

export default Photos;
