import React, { useRef, useEffect, useState, useContext } from "react";
import { CustomizeContext } from "context";
import { Box } from "@mui/material";
import NextImage from "next/image";
import { dataURLtoFile, cloudinaryResizeImage, shopifyResizeImage } from "utils";
import Zoom from 'react-medium-image-zoom'
import { Close } from '@mui/icons-material'
import { useCloudinary } from "hooks";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";

const IMAGE_HEIGHT = 1600
const IMAGE_WIDTH = 1600
const PIXELS_PER_INCH = 300

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

const Canvas = ({ activeImage, enableZoom=false, ...props }) => {
  
  const { 
    customization, 
    setCustomization 
  } = useContext(CustomizeContext);

  const canvasRef = useRef(null);

  const [dataURL, setDataURL] = useState()
  
  const { unsignedUpload } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  });

  // Resize the logo to the actual print size, assuming an image of 72dpi
  const handleResizePrintLogo = (logo, width, height) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = logo;
      let url = '';
      img.onload = () => {
        // Resize the image to print at 300 DPI (PPI). Cloudinary 
        // maintains the aspect ratio and will pad the image not stretch it
        // using the transform 'pad' option
        let widthPixels = parseInt(width * PIXELS_PER_INCH)
        let heightPixels = parseInt(height * PIXELS_PER_INCH)
        url = cloudinaryResizeImage(logo, { width: widthPixels, height: heightPixels })
        resolve(url)
      }    
      img.onerror = () => {
        reject(new Error('Image failed to load'));
      };
    });
  }

  const renderCanvasImage = async (logo, placement, isFront=true) => {
    const image = new Image();
    image.crossOrigin="anonymous" // Required to export canvas image
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')    
    const width = parseInt(parseFloat(placement.width) / 100 * IMAGE_WIDTH);
    const height = parseInt(parseFloat(placement.height) / 100 * IMAGE_HEIGHT);
    image.src = cloudinaryResizeImage(logo, { width, height })   
    let imageSrc 
    image.onload = async () => {
      const width = parseFloat(placement.width) / 100 * IMAGE_WIDTH;
      const height = parseFloat(placement.height) / 100 * IMAGE_HEIGHT;  
      const xPos = parseFloat(placement.left) / 100 * IMAGE_WIDTH;
      const yPos = parseFloat(placement.top) / 100 * IMAGE_HEIGHT;
      ctx.drawImage(image, xPos, yPos, width, height)
      imageSrc = canvas.toDataURL("image/png")
      setDataURL(imageSrc)   
      let file = dataURLtoFile(imageSrc, "logo.png")
      let cloudinary = await unsignedUpload(file, "image.png")  
      let printResizedLogo = await handleResizePrintLogo(logo, placement.widthInches, placement.heightInches)
      if(isFront){        
        setCustomization({
          ...customization,
          print_url_1: printResizedLogo, 
          print_preview_1: cloudinary?.data?.secure_url,
          file_extension_1: 'png'
        })
      }else{
        setCustomization({
          ...customization,
          print_url_2: printResizedLogo, 
          print_preview_2: cloudinary?.data?.secure_url,
          file_extension_2: 'png'
        })
      }
    }
    return imageSrc
  }

  useEffect(() => {     
    const image = new Image();
    image.crossOrigin="anonymous" 
    image.src = shopifyResizeImage(activeImage?.url, IMAGE_HEIGHT, IMAGE_WIDTH)
    image.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      ctx.drawImage(image, 0, 0, IMAGE_HEIGHT, IMAGE_WIDTH)
      setDataURL(canvas.toDataURL("image/png"))
      if(activeImage?.isFront && customization?.print_logo_1 && customization?.print_placement_1){            
        renderCanvasImage(          
          customization?.print_logo_1,
          customization?.print_placement_1, 
          true       
        )
      }  
      if(activeImage?.isBack && customization?.print_logo_2 && customization?.print_placement_2){            
        renderCanvasImage(          
          customization?.print_logo_2,
          customization?.print_placement_2,    
          false    
        )
      }    
    }    

  }, [
    activeImage, 
    customization?.print_placement_1, 
    customization?.print_logo_1, 
    customization?.print_placement_2,
    customization?.print_logo_2, 
  ])

  if (!activeImage) return null;
  return (
    <Box sx={sx.root}>
      { dataURL && (
        enableZoom ? (
        <Zoom scale={4} IconUnzoom={Close}>
          <CanvasImage 
            src={ dataURL }
          />
        </Zoom>
        ):(
          <CanvasImage 
            src={ dataURL }
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
