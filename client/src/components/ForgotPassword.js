import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Fab, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Form, useNavigate } from 'react-router-dom';
var message = ""
var forWardEmail = ""
function ForgotPassword() {
    const [enable,setEnable] = useState(false)
    const [disable,setDisable] = useState(false)
    const [submitOTP,setOTP] = useState(false)
    const navigate = useNavigate()
    const theme = createTheme({
        palette: {
          background:{
            default : "#001E3C"
          },
          mode: 'dark',
        },
      });

    const SendOtp = (event) =>{
        event.preventDefault()
        console.log("Button clicked")

        const data = new FormData(event.currentTarget)
        const result = {
            "email" : data.get("email"),
        }
        forWardEmail = result
        console.log(result)
        postDetails(JSON.stringify(result),"sendEmail")
    }

    async function postDetails(data,call){
        const response = await fetch("/api/"+call,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : data
        }).then(response => response.text()).then(response => {
          console.log(response)
          const obj = JSON.parse(response)
          const key = Object.keys(obj) 
          
          // console.log("Keys: " + Object.keys(obj))
          if(key == "success"){
            const successMessage = obj["success"];
            message = successMessage;
            console.log("Success" + response["success"])
            if(call=="validOTP"){
                navigate("/ChangePassword",{state:{body:forWardEmail}})
            }
          }
          if(key == "failure"){
            const failureMessage = obj["failure"];
            message = failureMessage;
            console.log("Message: " +message)
            console.log("Failure: " + obj["failure"])
          }
          
        })
        // if(response.ok){  
        //     console.log("It worked");
        //     // form.submit()
        //     // <Navigate to="/dashboard" />
        //     console.log(response.text());
        // }
      }

    const validateOTP = (event) =>{
        event.preventDefault()
        console.log("Inside validate OTP")
        const data = new FormData(event.currentTarget)
        const result = {
            "OTP" : data.get("otp")
        }
        console.log(result)
        postDetails(JSON.stringify(result),"validOTP")
        
    }
  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        component = "form"
        onSubmit={SendOtp}
        
        name="forgotPassForm"
          sx={{
            marginTop : 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}  
        >
        <Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            Forgot your password? </Typography>
            {/* <Box component="form" onSubmit={sendOtp} name="forgotPassForm"> */}
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
            />
            {<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>}
            </Box>

            <Box component="form"  onSubmit={validateOTP}>
            {<TextField
              margin="normal"
              required
              type="textNumber"
              fullWidth
              id="otp"
              label="Enter your OTP"
              name="otp"
            />}
            
            {<Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Submit OTP
            </Button>}
            </Box>

            
            {/* </Box> */}




        </Container>
        </ThemeProvider>
  )
}

export default ForgotPassword