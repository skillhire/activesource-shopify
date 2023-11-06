import React, { useEffect } from "react";
import { useClickOrDrag, useInstagram } from "hooks";
import { Typography, CardActionArea } from "@mui/material";
import { Section, Carousel } from "components";
import Image from "next/image";
import { INSTA_CAROUSEL_RESPONSIVE } from "constants/shop";

const InstagramImage = (props) => {
  const { image, url } = props.image;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  const { onMouseDown, onMouseUp } = useClickOrDrag({
    onClick: handleClick,
  });

  return (
    <CardActionArea
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      sx={sx.instagramPost}
    >
      <Image
        src={image}
        alt="Instagram Image"
        height={356}
        width={356}
        responsive="true"
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        onClick={(e) => e.preventDefault()}
      />
    </CardActionArea>
  );
};

const InstagramCarousel = () => {
  const { loading, error, title, images, fetchInstagram } = useInstagram();

  useEffect(() => {
    fetchInstagram();
  }, []);

  return (
    <Section isFlush isStacked>
      <Typography variant="h3" sx={sx.title}>
        {title}
      </Typography>
      <Carousel responsive={INSTA_CAROUSEL_RESPONSIVE}>
        {images?.map((image, i) => (
          <InstagramImage key={i} image={image} />
        ))}
      </Carousel>
    </Section>
  );
};

export default InstagramCarousel;

const sx = {
  title: {
    textAlign: "center",
    mt: {
      xs: 5.5,
      sm: 9.5,
    },
    mb: {
      xs: 10,
      sm: 10,
    },
  },
  instagramPost: {
    mb: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
