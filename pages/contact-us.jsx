import { Layout } from "components";
import { Box, Typography, Container } from "@mui/material";
import Script from "next/script";

const ContactUs = () => {
  return (
    <Layout metaTitle="Contact Us | Active Source">
      <Container maxWidth="sm">
        <Box sx={sx.root}>
          <Script
            src="https://contact.gorgias.help/api/contact-forms/loader.js?uid=0hfeb3z6&locale=en-US"
            data-gorgias-contact-form="script"
          />
          <div data-gorgias-contact-form="container"></div>
        </Box>
      </Container>
    </Layout>
  );
};

export default ContactUs;

const sx = {
  root: {
    py: 8,
  },
};
