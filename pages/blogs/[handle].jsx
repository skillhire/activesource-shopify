import React, { useEffect } from "react";
import { ArticleItem, Layout } from "components";
import { Box, Container, List, Typography } from "@mui/material";
import { useBlogs } from "hooks";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { blog, articles, error, fetchBlog } = useBlogs();

  useEffect(() => {
    if (handle) {
      fetchBlog(handle);
    }
  }, [handle]);

  return (
    <Layout>
      <Box sx={sx.root}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={sx.title}>
            {blog?.title}
          </Typography>
          <List disablePadding>
            {articles?.map((article, index) => (
              <ArticleItem key={index} article={article} />
            ))}
          </List>
        </Container>
      </Box>
    </Layout>
  );
};

export default Blog;

const sx = {};
