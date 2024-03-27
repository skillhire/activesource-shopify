import { Layout } from "components";
import { Box, Container } from "@mui/material";
import Script from "next/script";

const ContactUs = () => {
  return (
    <Layout metaTitle="Contact Us | Active Source">
      <Container maxWidth="sm">
        <Box sx={sx.root}>
          <iframe 
            src="https://contact.gorgias.help/forms/0hfeb3z6" 
            width="100%"
            height="1000"
            style={{
              border: 0
            }}
          />
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
