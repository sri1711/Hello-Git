import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Fab, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Form, useNavigate,useLocation } from 'react-router-dom';
var message = "";
function ChangePassword() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {body} = state;
    console.log("In change Password Page: " + body["email"])
    const theme = createTheme({
        palette: {
          background:{
            default : "#001E3C"
          },
          mode: 'dark',
        },
      });
      const changePass = (event) =>{
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const result = {
            "email" : body["email"],
            "newPass" : data.get("password")
        }
        postDetails(JSON.stringify(result),"changePass")
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
            navigate("/",{replace:true})
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
    return (
        <ThemeProvider theme={theme}>
      
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
          component = "form"
          onSubmit={changePass}
          
          name="changePassForm"
            sx={{
              marginTop : 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}  
          >
            <Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            Forgot your password? </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter your new password"
              name="password"
            />
            {<Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Change Password
            </Button>}

            </Box>
            </Container>
            </ThemeProvider>
  )
}

export default ChangePassword