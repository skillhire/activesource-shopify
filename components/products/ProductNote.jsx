import React from 'react'
import { Box, Typography } from '@mui/material'

const ProductNote = (props) => {
  const { note } = props
  return(
    <Box py={2}>
      <Typography sx={ sx.text } variant="overline" color='text.primary'>
        {note}
      </Typography>
    </Box>
  )
}

export default ProductNote

const sx = {
  text: {
    whiteSpace: 'pre-line'
  }
}
  