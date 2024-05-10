import React, { useState, useContext, useEffect } from "react"
import { useVariants, useSegment } from "hooks"
import { Box, Container, Grid } from "@mui/material"
import {
  ProductDetails,
  ProductImages,
  ProductTabs,
} from "components"
import ProductCustomize from "components/products/ProductCustomize"
import ProductAddToCart from "components/products/ProductAddToCart"
import ProductsYouMayAlsoLike from "components/products/ProductsYouMayAlsoLike"
import { CustomizeContext } from "context"
import PlacementModal from "sections/products/PlacementModal"
import { getMetaValue, getProductColors } from "utils"
import { 
  SHIRT_PLACEMENTS,
  HOODIE_PLACEMENTS,
  BAG_PLACEMENT 
} from "constants/placements";

const Product = ({ 
    loading,
    handle, 
    product, 
    recommendedProducts, 
    images,
    productUrl,
    disableShipping,
    disableFileGuidelines,
    ...props  
  }) => {  

  const { 
    setNotForSale,
    setDisableLogo,
    setDisablePlacement,
    activeImage,
    setActiveImage,
    activePlacement,
    setActivePlacement,
    activeColor,
    setActiveColor,
    customization, 
    setCustomization 
  } = useContext(CustomizeContext)

  const { trackProductViewed } = useSegment()

  const [zoom, setZoom] = useState(false)  
  const [placements, setPlacements] = useState(SHIRT_PLACEMENTS)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [addToCartDisabled, setAddToCartDisabled] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [frontOrBack, setFrontOrBack] = useState("front")
  
  const { 
    variant, 
    setVariant 
  } = useVariants({
    product,
    selectedOptions,
  })

  const handleUpload = async (image, frontOrBack) => {
    // Store the original logo files
    if (frontOrBack == "front") {
      setCustomization({
        ...customization,
        print_logo_1: image,
      })
    } else if (frontOrBack == "back") {
      setCustomization({
        ...customization,
        print_logo_2: image,
      })
    }
  }

  const handlePreviewClick = (imgSrc, frontOrBack) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setFrontOrBack(frontOrBack)

    if(frontOrBack == "front"){
      setCustomization({
        ...customization,
        print_background_1: imgSrc,
      })
    }else if(frontOrBack == "back"){
      setCustomization({
        ...customization,
        print_background_2: imgSrc,
      })
    }
    
  }

  const handleImageClick = (image) => {
    if(image?.url == activeImage?.url){
      setZoom(true)
    }else{
      setActiveImage({ url: image?.url })
    }    
  }

  const handleClose = () => {
    setZoom(false)
  }

  const handleOptionChange = (name, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    })
  }

  const handleColorClick = (color) => {
    setActiveColor(color)                    
    setActiveImage({
      url: color?.print_preview_1 || color?.front_placement || customization?.print_preview_1
    })
    let newCustomization = { ...customization }
    
    let { 
      front_placement,      
      print_url_1,
      print_preview_1, 
      print_location_1,

      back_placement,
      print_url_2,
      print_preview_2,
      print_location_2        
    } = color || {}
    
    newCustomization = {
      ...newCustomization,
      print_background_1: front_placement || newCustomization?.print_background_1,
      print_url_1: print_url_1 || newCustomization?.print_url_1,
      print_preview_1: print_preview_1 || newCustomization?.print_preview_1, 
      print_location_1: print_location_1 || newCustomization?.print_location_1,
      
      print_background_2: back_placement || newCustomization?.print_background_2,
      print_url_2: print_url_2 || newCustomization?.print_url_2,
      print_preview_2: print_preview_2 || newCustomization?.print_preview_2,
      print_location_2: print_location_2 || newCustomization?.print_location_2                    
    }        


    setCustomization(newCustomization)  
    
    setSelectedOptions({
      ...selectedOptions,
      Color: color?.name,
    })
  }


  const handlePlacementClick = (frontOrBack) => {
    setFrontOrBack(frontOrBack)
    setOpenModal(true)
  }

  const handleSelectPlacement = (newPlacement) => {
    setActivePlacement({
      ...activePlacement,
      [frontOrBack]: newPlacement,
    })
    let newCustomization = { ...customization }   
    if(frontOrBack == "front"){
      newCustomization = {
        ...newCustomization,
        print_placement_1: newPlacement,
        print_location_1: newPlacement?.code,
      }
    }
    if(frontOrBack == "back"){
      newCustomization = {
        ...customization,
        print_placement_2: newPlacement,
        print_location_2: newPlacement?.code,
      }      
    }
    setCustomization(newCustomization)
    setActiveImage({
      id: frontOrBack,
      url: activeColor?.[`${frontOrBack}_placement`]
    })    
    setOpenModal(false)
  }

  const handleReset = () => {
    setActivePlacement({})    
    setCustomization({
      ...customization,
      // Intentionally do not delete print_logos
      print_location_1: null,
      print_preview_1: null,
      print_type_1: 'DigitalPrint',    
      file_extension_1: 'png',
      print_placement_1: null,

      print_location_2: null,
      print_preview_2: null,
      print_type_2: 'DigitalPrint',    
      file_extension_2: 'png',
      print_placement_1: null
    })
    setActiveImage({ url: null })
    setSelectedOptions({})
    setVariant(null)
    setAddToCartDisabled(true)
  }

  useEffect(() => {
    if (product?.handle) {      
      handleReset()      
    }
  }, [product?.handle])
  
  // Set values from encoded JWT URL param
  useEffect(() => {
    // Find the variant from the variantId
    if (product?.variants && customization?.variantId) {
      const selectedVariant = product?.variants?.edges?.find(
        (v) => v?.node?.id?.split("/").pop() == customization?.variantId
      )
      if (selectedVariant?.node) {
        setVariant(selectedVariant.node)
      }

      let selectedColor = selectedVariant?.node?.selectedOptions?.find(
        (o) => o?.name == "Color"
      )?.value

      let selectedSize = selectedVariant?.node?.selectedOptions?.find(
        (o) => o?.name == "Size"
      )?.value

      let newSelectedOptions = {
        ...selectedOptions,
      }

      if (selectedColor) {
        newSelectedOptions = {
          ...newSelectedOptions,
          Color: selectedColor,
        }
      }

      if (selectedSize) {
        newSelectedOptions = {
          ...newSelectedOptions,
          Size: selectedSize,
        }
      }

      // Set the product selected options from Variant ID
      setSelectedOptions(newSelectedOptions)
    }
  }, [product, customization?.variantId])


  // Default select the first color option
  useEffect(() => {
    if(product?.id){
      let colors = getProductColors(product)
      if(colors.length > 0){
        let firstColor = colors[0]
        handleColorClick(firstColor)
        setCustomization({
          ...customization,
          print_background_1: firstColor?.front_placement,
        })
      }
    }
  }, [product?.id])


  useEffect(() => {
    if (variant?.sku) {      
      setCustomization({
        ...customization,
        print_sku: variant.sku,
      })
    }
  }, [variant?.sku])

  // Auto-select placement for tote bags
  useEffect(() => {
    if(product?.productType == "Bag"){
      setActivePlacement({        
        front: BAG_PLACEMENT
      })  
      setCustomization({
        ...customization,
        print_location_1: BAG_PLACEMENT?.code,        
        print_placement_1: BAG_PLACEMENT
      });
    }
    if(product?.productType == "Hoodie"){
      setPlacements(HOODIE_PLACEMENTS)
    }else{
      setPlacements(SHIRT_PLACEMENTS)
    }    
  }, [product?.productType])

  useEffect(() => {
    if(product?.handle){
      let _notForSale = getMetaValue(product, "not_for_sale") == "true"
      let _disableLogo = getMetaValue(product, "disable_logo") == "true"
      let _disablePlacement = getMetaValue(product, "disable_placement") == "true"
      setNotForSale(_notForSale)
      setDisableLogo(_disableLogo)
      setDisablePlacement(_disablePlacement)
    }
  }, [product?.handle])

  useEffect(() => {
    // Reset the selected options values when the product changes
    setSelectedOptions({})
    if (product?.id) {
      trackProductViewed(product)
    }
  }, [product?.id])

  return (
    <>
      <Container maxWidth="lg" sx={ sx.container }>
        <Box sx={sx.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              <ProductImages
                images={images}
                handleClick={handleImageClick}
                zoom={zoom}
                handleClose={handleClose}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <ProductDetails
                loading={loading}
                product={product}
                variant={variant}
                activeColor={activeColor}
                selectedOptions={selectedOptions}
                handleColorClick={handleColorClick}
                handleOptionChange={handleOptionChange}
              />              
              <ProductCustomize
                product={product}
                handleClick={handlePlacementClick}
                activeImage={activeImage}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                handleUpload={handleUpload}
                handlePreviewClick={handlePreviewClick}
              />                          
              <ProductAddToCart
                loading={loading}
                product={product}
                variant={variant}
                addToCartDisabled={addToCartDisabled}
              />              
            </Grid>
            <Grid item xs={12}>
              <Box mt={4} />
              <ProductTabs 
                product={product} 
                disableShipping={disableShipping}
                disableFileGuidelines={disableFileGuidelines}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductsYouMayAlsoLike 
                products={recommendedProducts}
                productUrl={productUrl}
              />              
            </Grid>
          </Grid>
        </Box>
      </Container>
      <PlacementModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        frontOrBack={frontOrBack}
        activePlacement={activePlacement[frontOrBack]}                
        handleClick={handleSelectPlacement}
        placements={ placements }
      />
    </>
  )
}

export default Product

const sx = {
  root: {
    py: 4,
  },
  container: {
    pt: 3
  },
  title: {
    my: 2
  }
}
