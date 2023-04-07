import React, { useCallback, useState } from "react";
import { Alert, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAllPhotosQuery, useAllTagsQuery } from "../servises/queries";
import Tags from "../components/Tags";
import Photos from "../components/Photos";
import routes from "../servises/routes";

const ALERT_CLOSED_KEY = "ALERT_CLOSED_KEY";
const useAlertClosed = (isLoading: boolean, photosCount?: number) => {
  const [isClosed, setClosed] = useState(true);

  const closeHandler = useCallback(() => {
    localStorage.setItem(ALERT_CLOSED_KEY, "1");
    setClosed(true);
  }, []);

  if (!isLoading) {
    if (!localStorage.getItem(ALERT_CLOSED_KEY) && !photosCount && isClosed) {
      setClosed(false);
    }
  }

  return { isClosed, closeHandler };
};

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const allPhotosQuery = useAllPhotosQuery(query);
  const allTagsQuery = useAllTagsQuery();
  const { isClosed, closeHandler } = useAlertClosed(
    allPhotosQuery.isFetching,
    allPhotosQuery.data?.length
  );

  return (
    <>
      <Box
        sx={{
          py: 1
        }}
      >
        <Stack spacing={2} alignItems="center" sx={{ mt: 1 }}>
          {!isClosed && (
            <Alert severity="info" onClose={closeHandler}>
              Upload your photos and find them instantly by clicking on tags.
            </Alert>
          )}
          <Button size="large" variant="contained" onClick={() => navigate(routes.photoUpload)}>
            Upload photo
          </Button>
        </Stack>
      </Box>
      <Tags
        isLoading={allTagsQuery.isFetching}
        query={query}
        setQuery={setQuery}
        tags={allTagsQuery.data}
      />
      <Photos
        query={query}
        setQuery={setQuery}
        isLoading={allPhotosQuery.isFetching}
        photos={allPhotosQuery.data}
      />
    </>
  );
}

export default Home;
