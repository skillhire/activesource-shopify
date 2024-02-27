import React, { useState } from "react";
import { Link, List, ListItem,ListItemText, Box, Tab, Tabs, Stack, Typography } from "@mui/material";
import ProductDescription from "./ProductDescription";

const ProductTabs = ({ product }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newValue) => setTab(newValue);

  return (
    <Box sx={sx.root}>
      <Tabs
        value={tab}
        indicatorColor="secondary"
        onChange={handleTabChange}
        sx={sx.tabs}
        centered
      >
        <Tab value={0} label="Description" />
        <Tab value={1} label="Shipping" />
        <Tab value={2} label="File Guidlines" />
      </Tabs>
      <Stack sx={sx.content}>
        <Box sx={ sx.tabContent }>
          {tab == 0 && <ProductDescription product={product} />}
          {tab == 1 && (
            <>
            <Typography sx={sx.text} variant="body1">
              All orders undergo manufacturing and processing within 3-5 business days. 
              <br />
              <br />
              We offer the following shipping options:              
            </Typography>              
            <List>
              <ListItem disablePadding>
                <ListItemText primary={'• USPS Ground Advantage: 2-5 business days'} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={'• USPS Priority Mail® : 1-3 business days'}  />
              </ListItem> 
              <ListItem disablePadding>
                <ListItemText primary={'• USPS Priority Mail Express®: Next-day to 2–day delivery service by 6 PM'}  />
              </ListItem>
            </List>
            <Typography sx={sx.text} variant="body1">
              Please note that the suggested shipping windows mentioned above do not include the initial 3-5 business days required for manufacturing and processing.
              <br />
              <br />
              For more detailed information, please visit our <Link href="/pages/shipping">Shipping page</Link>.
            </Typography>
            </>
          )}
          {tab == 2 && (
            <Typography sx={sx.text} variant="body1">
              <b>Art File Requirements:</b>
              <br />
              <br />
              • PNG files only, less than 5mb in size
              <br />
              • Transparency “On”
              <br />
              • Background must be transparent (NOT white or black) 
              <br />
              • Size must match your selected placement
              <br />
              • Resolution: at least 300 pixels per inch (PPI). For example, 14”x4” center-front placement needs an image that is 4200px x 1200px.
              <br />
              <br />
              For more details, see our <Link href="/docs/printing-guide">Printing Guide</Link>. Want a custom placement? See our <Link href="/docs/placement-guide">Custom Placement Guide</Link>. Still confused? <Link href="/contact-us">Contact Customer Service</Link> with questions. We're happy to help!
            </Typography>
          )}
          
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductTabs;

const sx = {
  root: { 
    width: "100%" 
  },
  tabs: {
    borderBottom: "1px solid",
    borderColor: "grey.400",
  },
  content: {
    py: 4,
    minHeight: "240px",
    borderBottom: "1px solid",
    borderColor: "grey.400",
    alignItems: 'center'
  },
  tabContent: {
    width: "100%",
    maxWidth: "775px"
  },
  text: { whiteSpace: "pre-line" },
};
