import React from "react";
import { Typography, Box, CardActionArea } from "@mui/material";
import { CoverImage } from "components";
import { useRouter } from "next/router";

const Post = ({ post, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    if (post?.url) {
      router.push(post?.url);
    }
  };

  return (
    <CardActionArea onClick={handleClick}>
      <CoverImage src={post.image} height={{ xs: 485, sm: 750 }}>
        <Box sx={sx.postContent}>
          <Typography
            variant="h3"
            sx={sx.title}
            color={post.whiteText ? "common.white" : "primary.main"}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            sx={sx.subtitle}
            color={post.whiteText ? "common.white" : "primary.main"}
          >
            {post.subtitle}
          </Typography>
        </Box>
      </CoverImage>
    </CardActionArea>
  );
};

export default Post;

const sx = {
  postContent: {
    p: {
      xs: 4,
      sm: 8,
    },
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    mt: 3,
    maxWidth: "400px",
    textAlign: "left",
  },
};
