import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const ArticleItem = ({ article, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${article?.blog?.handle}/articles/${article?.handle}`);
  };

  return (
    <ListItem disablePadding disableGutters>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Image
            src={article?.image?.url}
            responsive="true"
            height={100}
            width={100}
            style={sx.image}
          />
        </ListItemIcon>
        <ListItemText primary={article?.title} secondary={article?.excerpt} />
      </ListItemButton>
    </ListItem>
  );
};

export default ArticleItem;

const sx = {
  image: {
    marginRight: "10px",
    objectFit: "cover",
  },
};
