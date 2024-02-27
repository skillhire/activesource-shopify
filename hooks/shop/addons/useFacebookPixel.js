import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FB_PIXEL_ID } from 'constants/shop'

const useFacebookPixel = () => {
  const router = useRouter()

  const options = {
    autoConfig: true,
    debug: false,
  }

  useEffect(() => {
    const trackPageView = async () => {
      const { default: ReactPixel } = await import('react-facebook-pixel')
      ReactPixel.init(FB_PIXEL_ID, null, options)
      ReactPixel.pageView()
    }
    trackPageView()
    return () => {}
  }, [router?.pathname])
}

export default useFacebookPixel
