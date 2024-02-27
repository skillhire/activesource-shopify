import Image from "next/image";
import {
  Stack,
  Container,
  Typography,
  Box,
  Button,
  Link
} from "@mui/material";
import Service1 from "assets/services-1.png";
import Service2 from "assets/services-2.png";
import Service3 from "assets/services-3.png";

const ITEMS = [
  {
    title: "Meet Your New Profit Partner",
    description: "Until now, making a real profit from branded merch has been virtually impossible. Leveraging our founder's 20+ years of sourcing expertise for world-famous fashion brands, we've created a unique model that puts you back in charge. From wholesale pricing and quick turnarounds to no minimums, trendy styles, and diverse design flexibility, we have the formula to make branded apparel your new profit center.",
    image: Service1,
    buttonText: "Get Started Today",
    url: "/shop/all"
  },
  {
    title: "Your Brand, Your Way",
    description:
      "With 15 different placements and full-color printing, there's virtually no limit on what you can create. Go from generic to “wow!” in just two clicks.",
    image: Service2,
    buttonText: "Choose Your Products",
    url: "/shop/all"
  },
  {
    title: "Order the Product",
    description:
    "Tired of hidden fees and 'gotchas' when ordering branded apparel? With us, what you see is what you get.\n\nWe've listened to the frustrations of studio owners like you. That’s why we offer transparent prices, fast shipping, and exceptional service. Whether you need one piece or a thousand, we will deliver—on time, as promised. Get started and experience the \"no-hassle difference\" today!",
    image: Service3,
    buttonText: "Join the Active Source Revolution",
    url: "/shop/all"
  },
];

const SectionFeaturedCollection = () => {
  return (
    <Container maxWidth="lg" sx={sx.root}>
      <Stack sx={sx.header} spacing={2}>        
        <Typography variant="h3" maxWidth={700}>
          No Staff? No Time? No Experience? No Problem
        </Typography>
        <Typography variant="body1" maxWidth={700} sx={ sx.subtitle }>
          That's Why We Created Active Source Lab—The World’s First Truly Wholesale Creator for Your Branded Apparel.
        </Typography>
      </Stack>
      <Stack>
        {ITEMS.map((item, i) => {
          let itemContainerClass = { ...sx.itemContainer };
          if (i % 2 !== 1) {
            itemContainerClass = {
              ...itemContainerClass,
              ...sx.itemContainerReversed,
            };
          }
          return (
            <Box key={item.title} sx={itemContainerClass}>
              <Box sx={sx.item}>
                <Stack spacing={2}>
                  <Typography variant="h3">{item.title}</Typography>
                  <Typography variant="homeDescription" maxWidth={380}>
                    {item.description}
                  </Typography>
                  <Link sx={ sx.link} href={ item.url }>
                    { item.buttonText }
                  </Link>
                </Stack>
              </Box>
              <Box sx={sx.imageContainer}>
                <Image
                  src={item.image}
                  alt={`${item.title} Image`}                  
                  height={400}
                  width={400}
                  layout="responsive"
                  style={{
                    maxHeight: 400,
                    maxWidth: 400,                
                    objectFit: 'contain'
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Box sx={sx.buttonContainer}>
        <Button sx={ sx.button } variant="contained" color="secondary" href="/collections/womens">
          Get Started 
        </Button>
      </Box>
    </Container>
  );
};

export default SectionFeaturedCollection;

const sx = {
  root: {
    my: 6,        
    maxWidth: '1000px'
  },
  header: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  subtitle: {
    pb: 6
  },
  iconButton: {
    p: 1,
    background: (theme) => `${theme.palette.tertiary.main} !important`,
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "auto",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: {
      sm: '40%',
      xs: '100%'
    }      
  },
  itemContainer: {
    my: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: {
      sm: "row",
      xs: "column"
    }    
  },
  itemContainerReversed: {
    flexDirection: {
      sm: "row-reverse",
      xs: "column"
    }
  },
  item: {
    my: 5,
    px: 4,
    flex: 1,
    "@media (max-width: 600px)": {
      padding: 0,
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  buttonContainer: {
    my: 4,
    pb: 8,
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    pt: 1,
  },
  button: {
    width: 220,
    height: 64,
    fontSize: 20
  }  
};
