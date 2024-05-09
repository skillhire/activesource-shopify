import React, { useRef, useEffect, useState, useContext } from "react";
import { CustomizeContext } from "context";
import { Box } from "@mui/material";
import NextImage from "next/image";
import { dataURLtoFile, cloudinaryResizeImage, shopifyResizeImage } from "utils";
import Zoom from 'react-medium-image-zoom'
import { Close } from '@mui/icons-material'
import { useCustomization, useCloudinary } from "hooks";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";

const IMAGE_HEIGHT = 1600
const IMAGE_WIDTH = 1600
const PIXELS_PER_INCH = 300

const DEFAULT_PLACEMENT = {
  code: 'CF',
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  printWidth: 15,
  printHeight: 15
}

const CanvasImage = ({ src }) => (
  <NextImage 
    height={1600}
    width={1600}
    src={src}      
    style={{
      position: "relative",
      objectFit: "cover",        
    }}
    layout="responsive"
    onClick={(ev) => ev.preventDefault()}
  />  
)

const Canvas = ({ enableZoom=false, ...props }) => {
  
  const { 
    activeImage,
    setActiveImage,
    customization, 
    setCustomization 
  } = useContext(CustomizeContext);

  const canvasRef = useRef(null);
  
  const { unsignedUpload } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  });

  const resizeCloudinaryImage = (image, placement) => {
    const width = parseInt(parseFloat(placement.width) / 100 * IMAGE_WIDTH);
    const height = parseInt(parseFloat(placement.height) / 100 * IMAGE_HEIGHT);  
    return cloudinaryResizeImage(image, { width, height })   
  }

  const resizeShopifyImage = (image, height=IMAGE_HEIGHT, width=IMAGE_WIDTH) => {
    return shopifyResizeImage(image, height, width)
  }

  const resizePrintUrl = (image, widthInches, heightInches) => {
    return cloudinaryResizeImage(image, { 
      width: widthInches * PIXELS_PER_INCH, 
      height: heightInches * PIXELS_PER_INCH
    })
  }

  const handleUploadToCloudinary = async (dataUrl) => {
    let file = dataURLtoFile(dataUrl, "logo.png")
    let cloudinary = await unsignedUpload(file, "image.png")        
    let previewUrl = cloudinary?.data?.secure_url
    return previewUrl 
  }

  const renderCanvasImage = async (resizedImage, placement=DEFAULT_PLACEMENT) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin="anonymous" // Required to export canvas image
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')    
      image.src = resizedImage
      let imageSrc 
      image.onload = async () => {
        const width = parseFloat(placement.width) / 100 * IMAGE_WIDTH;
        const height = parseFloat(placement.height) / 100 * IMAGE_HEIGHT;  
        const xPos = parseFloat(placement.left) / 100 * IMAGE_WIDTH;
        const yPos = parseFloat(placement.top) / 100 * IMAGE_HEIGHT;
        ctx.drawImage(image, xPos, yPos, width, height)
        imageSrc = canvas.toDataURL("image/png")      
        setActiveImage({ url: imageSrc })   
        return resolve(imageSrc)
      }     
    }) 
  }

  const renderCompositeImage = async (logo, background, placement) => {

    // You need an overlay image, background image, and the placement data 
    // to render a composite image.
    if(logo && background && placement){      

      // First resize the images. We assume the background image is  
      // a Shopify product image and the logo is a Cloudinary image. 
      let backgroundSrc = resizeShopifyImage(background)
      let logoSrc = resizeCloudinaryImage(logo, placement)

      // First render the backround image to canvas with default placement 
      // at 0,0 coordinates and 100% height and width
      await renderCanvasImage(backgroundSrc)
      
      // Render the logoSrc image and return the generated previewImage 
      let imageSrc = await renderCanvasImage(logoSrc, placement)

      // Upload the previewUrl to Cloudinary. 
      let previewUrl = await handleUploadToCloudinary(imageSrc)

      // Generate the printUrl last 
      let printUrl = resizePrintUrl(logo, placement.printWidth, placement.printHeight)
            
      return {
        printUrl,
        previewUrl
      }
    }
  }


  useEffect(() => {    
    const { 
      print_logo_1, 
      print_background_1, 
      print_placement_1 
    } = customization || {}
    
    const {
      printUrl,
      previewUrl
    } = renderCompositeImage(
      print_logo_1, 
      print_background_1, 
      print_placement_1      
    )    

    setActiveImage({ url: previewUrl })
    setCustomization({
      ...customization,
      print_url_1: printUrl,
      print_preview_1: previewUrl
    })

  }, [
    customization?.print_background_1,
    customization?.print_placement_1, 
    customization?.print_logo_1, 
  ])

  useEffect(() => {   
    
    const { 
      print_logo_2, 
      print_background_2, 
      print_placement_2 
    } = customization || {}

    const {
      printUrl,
      previewUrl
    } = renderCompositeImage(
      print_logo_2, 
      print_background_2, 
      print_placement_2      
    )    

    setActiveImage({ url: previewUrl })
    setCustomization({
      ...customization,
      print_url_2: printUrl,
      print_preview_2: previewUrl
    })
    renderCompositeImage(
      customization?.print_logo_2,
      customization?.print_background_2,
      customization?.print_placement_2
    )    
  }, [
    customization?.print_background_2,
    customization?.print_placement_2, 
    customization?.print_logo_2, 
  ])

  return (
    <Box sx={sx.root}>
      { activeImage?.url && (
        enableZoom ? (
        <Zoom scale={4} IconUnzoom={Close}>
          <CanvasImage 
            src={ activeImage?.url }
          />
        </Zoom>
        ):(
          <CanvasImage 
            src={ activeImage?.url }
          />          
        )
      )}
      <canvas 
        ref={canvasRef} 
        width={IMAGE_WIDTH} 
        height={IMAGE_HEIGHT} 
        style={{display: "none"}} 
      />
    </Box>
  );
};

export default Canvas;

const sx = {
  root: {
    position: 'relative',
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',  
    maxHeight: '600px',
    maxWidth: '800px',
  },
  image: {
    position: "relative",
    objectFit: "contain",
  },
};
