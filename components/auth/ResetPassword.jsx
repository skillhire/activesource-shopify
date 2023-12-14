import React, { useState, useEffect } from "react"
import { useAlerts, useAuth } from "hooks"
import {
  Stack,
  Link,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material"
import { useRouter } from 'next/router'
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPassword = ({ onSuccess }) => {
  const router = useRouter()
  const { showAlertSuccess, showAlertError } = useAlerts()
  const { error, loading, resetByUrl } = useAuth()  
  const [customer, setCustomer] = useState({})

  const handleChange = (e) => {
    const { name } = e.target
    const value = e.target.type === "checkbox" ?  
      e.target.checked : 
      e.target.value
    setCustomer({
      ...customer,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    if (customer?.password && router?.query?.url) {
      let resp = await resetByUrl(password, router?.query?.url)
      if (resp?.customerResetByUrl?.customerAccessToken) {
        showAlertSuccess('Your password has successfully been changed.')
        onSuccess()
      } else {
        showAlertError('There was an error resetting your password')
      }
      return resp
    } else {
      showAlertError("Please enter your email to reset password.")
    }
  }

  useEffect(() => {
    if (error && Object.keys(error)?.length > 0) {
      showAlertError("Your email or password is incorrect")
    }
  }, [error])

  return (
    <Stack alignItems="center">
      <ResetPasswordForm
        loading={loading}
        customer={customer}
        handleChange={handleChange}
      />
      <Button
        sx={sx.button}
        fullWidth
        color="secondary"
        endIcon={loading && <CircularProgress size={20} sx={sx.progress} />}
        variant="contained"
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
      <Link href="/login" variant="link" size="small">
        <Typography variant="overline">Sign In</Typography>
      </Link>
    </Stack>
  )
}

export default ResetPassword

const sx = {
  button: {
    my: 2,
    mt: 4,
  },
  progress: {
    color: "#fff",
  },
}
