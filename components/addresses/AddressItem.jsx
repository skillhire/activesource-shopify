import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ChevronRight } from "lucide-react";

const AddressItem = ({ styles, address, handleClick, ...props }) => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton onClick={() => handleClick(address)}>
          <ChevronRight size={20} />
        </IconButton>
      }
    >
      <ListItemButton onClick={() => handleClick(address)} sx={sx.item}>
        <ListItemText
          primary={
            <Typography gutterBottom variant="subtitle1">
              {address?.firstName} {address?.lastName} {address?.company}
            </Typography>
          }
          secondary={
            <>
              <Typography gutterBottom variant="body2" color="textSecondary">
                {address.address1}
              </Typography>
              {address.address2 && (
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {address.address2}
                </Typography>
              )}
              <Typography gutterBottom variant="body2" color="textSecondary">
                {[address?.city, address?.province].join(", ")} {address?.zip}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

AddressItem.propTypes = {
  styles: PropTypes.object,
  address: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AddressItem;

const sx = {
  root: {},
  button: {
    p: 0,
  },
  item: {
    borderRadius: 2,
    m: 0,
    width: "100%",
    maxWidth: "100%",
  },
  card: {
    borderRadius: 2,
    backgroundColor: "common.white",
    borderColor: "common.card",
  },
};
