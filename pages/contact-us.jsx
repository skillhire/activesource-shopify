import { Layout } from "components";
import { Container } from "@mui/material";
import Script from "next/script";

const ContactUs = () => {
  return (
    <Layout title="Contact Us | Active Source">
      <Container maxWidth="sm">
        <Script
          src="https://contact.gorgias.help/api/contact-forms/loader.js?uid=0hfeb3z6&locale=en-US"
          data-gorgias-contact-form="script"
        />
        <div data-gorgias-contact-form="container"></div>
      </Container>
    </Layout>
  );
};

export default ContactUs;
