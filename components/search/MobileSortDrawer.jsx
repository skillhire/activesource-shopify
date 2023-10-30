import { Drawer } from "components";
import { Box } from "@mui/material";
import MenuList from "./MenuList";
import { Close } from "@mui/icons-material";

const MobileSortDrawer = (props) => {
  const { open, handleClose, options, value, reverse, handleClick } =
    props || {};

  const handleSortClick = (option) => {
    handleClose();
    handleClick(option);
  };

  return (
    <Drawer
      open={open}
      handleClose={handleClose}
      anchor="bottom"
      title="Sort By"
      anchorRight
      icon={Close}
    >
      <Box sx={sx.root}>
        <MenuList
          enableIcons
          value={value}
          reverse={reverse}
          options={options}
          handleClick={handleSortClick}
        />
      </Box>
    </Drawer>
  );
};

export default MobileSortDrawer;

const sx = {
  root: {},
};
