import React from "react"
import { Typography } from "@mui/material"
import { ProductGrid } from "components"
import { useResponsive } from "hooks"

const ProductYouMayAlsoLike = (props) => {

  const { products } = props || {}

  const { isMobile } = useResponsive();

  if(!products) return null;
  return(
    <>
      <Typography variant="h4" sx={ sx.title }>
        You May Also Like 
      </Typography>
      <ProductGrid
        variant={isMobile ? "carousel" : "grid"}
        products={products}
      />
    </>
  )
}

export default ProductYouMayAlsoLike

const sx = {
  title: {
    textAlign: 'center',
    my: 2
  }
}