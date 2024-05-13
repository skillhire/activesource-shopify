import React, { useRef, useState } from "react";
import {
  dataURLtoFile,
  cloudinaryResizeImage,
  shopifyResizeImage,
} from "utils";
import { useCloudinary } from "hooks";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";

const IMAGE_HEIGHT = 1600;
const IMAGE_WIDTH = 1600;
const PIXELS_PER_INCH = 300;

/* 
  Render a canvas element to the DOM with the following style:
  <canvas 
    ref={canvasRef} 
    width={IMAGE_WIDTH} 
    height={IMAGE_HEIGHT} 
    style={{display: "none"}} 
  />
*/

const useCanvas = ({
  canvasRef,
  width = IMAGE_WIDTH,
  height = IMAGE_HEIGHT,
}) => {
  const { unsignedUpload } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  });

  const [printUrl, setPrintUrl] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const generateCompositeImage = async ({
    logo, // logo src
    image, //Shopify product image
    leftPct, // percentage
    topPct, // percentage
    widthPct, // percentage
    heightPct, // percentage
  }) => {
    // Render the Shopify image on the canvas
    let resizedImage = await resizeShopifyImage(backgroundSrc);
    await renderCanvasImage(resizedImage, 0, 0);

    // Render the Shopify image on the canvas
    let compositeImage = await renderCanvasOverlayImage({
      src: logo,
      leftPct,
      topPct,
      widthPct,
      heightPct,
    });
    setPrintUrl(resizePrintImage(logo, width, height));
    setPreviewUrl(compositeImage);
    return compositeImage;
  };

  const resizeShopifyImage = (src) => {
    shopifyResizeImage(src, height, width);
  };

  // Resize the logo to the actual print size using
  const resizePrintImage = (
    logo,
    printWidth,
    printHeight,
    ppi = PIXELS_PER_INCH
  ) => {
    let widthPixels = parseInt(printWidth * ppi);
    let heightPixels = parseInt(printHeight * ppi);
    url = cloudinaryResizeImage(logo, {
      width: widthPixels,
      height: heightPixels,
    });
    return url;
  };

  const uploadToCloudinary = async (imageSrc, fileName = "image.png") => {
    let file = dataURLtoFile(imageSrc, "image.png");
    let cloudinary = await unsignedUpload(file, fileName);
    return cloudinary?.data?.secure_url;
  };

  const renderCanvasImage = (src, xPos = 0, yPos = 0) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        ctx.drawImage(image, xPos, yPos, height, width);
        let dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      };
    });
  };

  const renderCanvasOverlayImage = async ({
    src,
    leftPct,
    topPct,
    widthPct,
    heightPct,
  }) => {
    const width = (parseFloat(widthPct) / 100) * width;
    const height = (parseFloat(heightPct) / 100) * height;
    const xPos = (parseFloat(leftPct) / 100) * width;
    const yPos = (parseFloat(topPct) / 100) * height;
    const resizedImage = cloudinaryResizeImage(src, { width, height });
    return renderCanvasImage(resizedImage, xPos, yPos, width, height);
  };

  return {
    canvasRef,

    printUrl,
    previewUrl,

    generateCompositeImage,
    renderCanvasImage,
    renderCanvasOverlayImage,

    resizeShopifyImage,
    resizePrintImage,
    uploadToCloudinary,
  };
};

export default useCanvas;
