import React, { useEffect } from 'react'
import { useAuth } from 'hooks'
import { getCookie } from 'cookies-next'

const AuthFromCookie = () => {

  const { accessToken, setAccessToken } = useAuth()

  useEffect(() => {
    if(!accessToken){
      const token = getCookie('shopifyAccessToken')
      if (token) {
        setAccessToken(token)
      }
    }
  }, [])

  return null 
}

export default AuthFromCookie