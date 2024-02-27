import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const Page = ({ title, subtitle, image, body, html = false, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box sx={ sx.imageContainer }>
        { image && (
          <Image
            src={image}
            width={1200}
            height={472}
            alt={title}
            style={{
              width: "100%",
              objectFit: "cover"
            }}
            responsive
          />
        )}
      </Box>
      <Typography variant="h1" sx={sx.title}>
        {title}
      </Typography>
      <Container maxWidth="sm" sx={ sx.container }>                
        { html ? (
          <Typography
            variant="body2"
            sx={sx.text}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ):(
          <Typography variant="body2" sx={sx.text}>
            {body}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Page;

const sx = {
  root: {
    pb: 2,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    top: "260px",
    width: "100%",
    color: "common.white"
  },
  text: {
    whiteSpace: "pre-wrap",
    '& p': {
      m: 'auto'
    },
    '& h2': {
      lineHeight: '1.3em',
    }
  },
  imageContainer: {
    display: 'relative',
    width: "100%",
    height: "472px",
    mb: "200px"
  },
  container: {
    mb: '200px'
  }
};
