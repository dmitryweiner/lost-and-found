import React from 'react';
import {Chip, Container, Paper} from "@mui/material";
import {Tag} from "../interfaces";
import {styled} from "@mui/material/styles";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type TagsProps = {
  tags: Tag[];
  query: string;
  setQuery: (query: string) => void;
};

const Tags = ({tags, query, setQuery}: TagsProps) => {
  if (tags.length === 0) {
    return null;
  }

  return <Container sx={{
    py: 1,
  }}
  >
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {tags.map((tag) => <ListItem key={tag.id}>
        <Chip
          onDelete={query === tag.name ? () => setQuery("") : undefined}
          onClick={() => setQuery(tag.name)}
          color={query === tag.name ? "primary" : "default"}
          label={tag.name}
        />
      </ListItem>)}
    </Paper>
  </Container>;
};

export default Tags;
