import React from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { CoverImage } from "components";
import moment from "moment";

const Article = ({ article, html = true, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Container maxWidth="md">
        <CoverImage image={article?.image} />
        <List sx={sx.authorItem}>
          <ListItem disableGutters>
            <ListItemText
              primary={
                <Typography variant="h2" sx={sx.title}>
                  {article?.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={sx.publishedAt}>
                  Published by {article?.authorV2?.name} on{" "}
                  {moment(article?.publishedAt).format("MM/DD/YYYY")}
                </Typography>
              }
            />
          </ListItem>
        </List>
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: article?.contentHtml }} />
        ) : (
          <Typography variant="body1" sx={sx.text}>
            {article?.contentHtml}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Article;

const sx = {
  title: {},
  authorItem: {
    mt: 4,
  },
  publishedAt: {
    color: "text.secondary",
  },
  text: {
    whiteSpace: "pre-wrap",
  },
};
