import React, {Component} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import "../App.css"
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {Stack} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import {BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
// import { InputAdornment, IconButton } from "@mui/material/core";

import { InputAdornment, IconButton, OutlinedInput } from '@mui/material';

import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import VisibilityOff from "@material-ui/icons-material/VisibilityOff";
import { useState } from 'react';
// import Register from './Register';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Async Devs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    background:{
        default : "#001E3C"
      },
    mode: 'dark',
  },

});

export default function Register() {
  
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const navigate = useNavigate();

  const [value, setValue] = React.useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

   const handleSubmit = (event) => {
    var form = document.getElementsByName("regForm")[0]
    console.log(form)
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    // const result = {
    //         "email" : data.get('email'),
    //         "password" : data.get('password'),
    //         "firstName" : data.get('fname'),
    //         "lastName" : data.get("lname"),
    //         "birthDate" : data.get("bdate"),
    //         "authProvider" : "email"
    // }
    const result = {
      "email" : "vijay@gmail.com",
      "password" : "vijay",
      "firstName" : "vijay",
      "lastName" : "vijay",
      "birthDate" : "vijay",
      "authProvider" : "email"
    }
    console.log(JSON.stringify(result));
    postDetails(JSON.stringify(result),form,event)
    form.reset()
    // navigate("/dashboard",{replace:true})
    // event.preventDefault()
  };

  async function postDetails(data,form,event){
    const response = await fetch("/api/add",{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : data
    })
    if(response.ok){
        console.log("It worked")
        // form.submit()
        console.log(response)
    }
  }


  return (
    
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop : 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
            <AppRegistrationIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box name="regForm" noValidate component="form" onSubmit={handleSubmit} sx ={{mt:1}}>
          
          <Grid container  spacing = {1}>
            <Grid item xs = {6}>
                <TextField
                    margin="normal"
                    required
                    id="fname"
                    variant = "outlined"
                    label="First Name"
                    name="fname"
                    autoComplete="email"
                    autoFocus
                    />
                </Grid>
            <Grid item xs = {6}>
                <TextField
                    margin="normal"
                    required
                    id="lname"
                    variant = "outlined"
                    label="Last Name"
                    name="lname"
                    autoComplete="email"
                    
                />
            </Grid>
          </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Birth Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                name="bdate"
                onChange={handleDateChange}
                renderInput={(params) => <TextField sx = {{mt:2}} name="bdate" fullWidth {...params} />}
            />
            </LocalizationProvider>
            <FormControl variant="outlined" sx = {{mt:3}} required fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <VisibilityOn />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}