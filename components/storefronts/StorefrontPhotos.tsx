import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Link, Grid, CardActionArea, Button, Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import Image from 'next/image';

const Photo = ({ photo, store }) => {

  const router = useRouter();
  const handleClick = () => {
    router.push(`/storefronts/${store}/products/${photo?.product?.handle}`)
  }

  return(
    <Box 
      sx={sx.photo}
    >
      <CardActionArea 
        sx={{
          p: 0,
        }}
        disableRipple
        onClick={ handleClick }
      >
      <Image  
        src={photo?.image}
        alt={photo?.title}
        height={287}
        width={265}
        layout="responsive"
      />
      </CardActionArea>
      <Stack direction="row" spacing={1}>
        <Link 
          href={photo?.url}
          variant="body2"
        >
          Download Artwork 
        </Link>
        <Link 
          variant="body2"
          href={`/storefronts/${store}/products/${photo?.product?.handle}`}
        >
          View Product 
        </Link>
      </Stack>
    </Box>
  )
}

const StorefrontFeaturedCollection = (props) => {
  
  const MAX_PHOTOS = 8
  
  const { storefront, photos, handleClick } = props || {}
  const router = useRouter();
  const { store } = router?.query;

  const [loadMore, setLoadMore] = useState(false)
  const [activePhotos, setActivePhotos] = useState([])
  useEffect(() => {
    if(photos && !loadMore){
      setActivePhotos(photos?.slice(0, MAX_PHOTOS))
    }else{
      setActivePhotos(photos)
    }
  }, [photos, loadMore])

  return (
    <Stack sx={sx.collection} spacing={2}> 
      {photos && (
        <>
          <Typography variant="h3" sx={ sx.title }>
            Inspiration Board
          </Typography> 
          <Grid container spacing={2}>            
            { activePhotos?.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Photo               
                  photo={photo}
                  store={store}
                />
              </Grid>
            ))}  
          </Grid>       
          <Box 
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',            
            }}
          >
            { (photos?.length > MAX_PHOTOS && loadMore == false) && (
              <Button 
                variant="contained"
                color="primary"
                onClick={() => setLoadMore(true)}
              >
                Load More 
              </Button>
            )}
          </Box>          
        </>
      )}
    </Stack>
  );
};

export default StorefrontFeaturedCollection;

const sx = {
  collection: {
    width: "100%",
    py: 6,
  },
  title: {
    textAlign: 'center'
  },
  photo: {
    width: '100%',
    maxWidth: 265,    
    mb: 2
  }
};
