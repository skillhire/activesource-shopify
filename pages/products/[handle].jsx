import React, { useState, useContext, useEffect } from "react"
import { useProducts, useVariants, useSegment } from "hooks"
import { useRouter } from "next/router"
import { Box, Container, Grid } from "@mui/material"
import {
  Alert,
  Layout,
  ProductDetails,
  ProductImages,
  ProductTabs,
} from "components"
import ProductCustomize from "components/products/ProductCustomize"
import ProductAddToCart from "components/products/ProductAddToCart"
import ProductYouMayAlsoLike from "components/products/ProductYouMayAlsoLike"
import { CustomizeContext } from "context"
import PlacementModal from "sections/products/PlacementModal"
import { getMetaValue, getProductColors } from "utils"
import { 
  SHIRT_PLACEMENTS,
  HOODIE_PLACEMENTS,
  BAG_PLACEMENT 
} from "constants/placements";

const Product = () => {
  const router = useRouter()

  const { handle } = router.query

  const { 
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

  const { loading, product, recommendedProducts, images, fetchProduct } =
    useProducts()

  const { variant, setVariant, variantImage } = useVariants({
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
    setActiveImage({
      id: frontOrBack,
      url: imgSrc
    })
  }

  const handleImageClick = (image) => {
    if(image?.url == activeImage?.url){
      setZoom(true)
    }else{
      setActiveImage(image)
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
      url: activeColor?.[`${frontOrBack}_placement`],
      isFront: frontOrBack == "front" ? true : false,
      isBack: frontOrBack == "back" ? true : false,
    })    
    setOpenModal(false)
  }

  const handleReset = () => {
    setActivePlacement({})    
    setCustomization({
      ...customization,
      print_location_1: null,
      print_preview_1: null,
      print_type_1: 'DigitalPrint',    
      file_extension_1: null,
      print_placement_1: null,

      print_location_2: null,
      print_preview_2: null,
      print_type_2: 'DigitalPrint',    
      file_extension_2: null,
      print_placement_1: null
    })
    setActiveImage(null)
    setSelectedOptions({})
    setVariant(null)
    setAddToCartDisabled(true)
  }

  useEffect(() => {
    if (product?.handle) {      
      handleReset()      
    }
  }, [product?.handle])

  useEffect(() => {
    if(handle){
      fetchProduct(handle)
    }
  }, [handle])

  useEffect(() => {
    setActiveImage(variantImage || product?.images?.edges[0]?.node)
  }, [product, variantImage])


  const handleAddToCartDisabled = () => {
    const isBack = getMetaValue(product, "back_placement") == "true"
    const isFront = getMetaValue(product, "front_placement") == "true"
    const disabled =
      !variant ||
      (isFront && (!customization?.print_url_1 || !customization?.print_placement_1)) ||
      (isBack && (!customization?.print_url_2 || !customization?.print_placement_2));
    setAddToCartDisabled(disabled)
  }

  useEffect(() => {
    handleAddToCartDisabled()
  }, [product, customization, variant])

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

  useEffect(() => {
    if (activeColor) {
      setActiveImage({
        url: activeColor?.front_placement,
      })
      setCustomization({
        ...customization,
        print_background_1: activeColor?.front_placement,
        print_background_2: activeColor?.back_placement,
      })
      // Select the product color option that
      // matches the meta color name field. This is necessary
      // to ensure the correct color / size SKU is assigned at checkout
      setSelectedOptions({
        ...selectedOptions,
        Color: activeColor?.name,
      })
    }
  }, [activeColor])

  // Default select the first color option
  useEffect(() => {
    if(!activeColor && product){
      let colors = getProductColors(product)
      if(colors.length > 0){
        setActiveColor(colors[0])        
      }
    }
  }, [activeColor, product])

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
        front: BAG_PLACEMENT
      });
    }
    if(product?.productType == "Hoodie"){
      setPlacements(HOODIE_PLACEMENTS)
    }else{
      setPlacements(SHIRT_PLACEMENTS)
    }    
  }, [product?.productType])

  useEffect(() => {
    // Reset the selected options values when the product changes
    setSelectedOptions({})
    if (product?.id) {
      trackProductViewed(product)
    }
  }, [product?.id])


  return (
    <Layout metaTitle={product?.title} metaDescription={product?.description}>

      <Container maxWidth="lg" sx={ sx.container }>
        <Box sx={sx.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              <ProductImages
                images={images}
                activeImage={activeImage}
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
              <ProductTabs product={product} />
            </Grid>
            <Grid item xs={12}>
              <ProductYouMayAlsoLike 
                products={recommendedProducts}
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
    </Layout>
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
