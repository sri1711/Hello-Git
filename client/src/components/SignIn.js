import React, {Component} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate } from 'react-router-dom';

// import Register from './Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
// import { InputAdornment, IconButton } from "@mui/material/core";

import { InputAdornment, IconButton, OutlinedInput, modalUnstyledClasses } from '@mui/material';

import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import VisibilityOff from "@material-ui/icons-material/VisibilityOff";
import { useState } from 'react';
import Register from './Register';

const sessionCookie = "session";

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

function getMillisecondsForHours(hours) {
  return hours*60*60*1000;
}

function createCookie(cookieName, cookieValue, cookieLifeTimeInHrs) {
  const expireDate = Date.now() + getMillisecondsForHours(cookieLifeTimeInHrs);
  let expireTime = "max-age=" + expireDate.toString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expireTime + ";path=/";
  console.log("creating cookie")
}

function removeCookie(cookieName) {
  let cookieValue = getCookie(cookieName);
  let expireTime = "max-age=0";
  document.cookie = cookieName + "=" + cookieValue + ";" + expireTime + ";path=/";
  console.log("creating cookie")
}

function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

// function createLocalStorageItem(item, value) {
//   localStorage.setItem(item, value);

// }

export default function SignIn() {
  const navigate = useNavigate();
  checkAndRedirectToApplication();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const [isShown,setShown] = useState(false);

  const handleCLick = evennt => {
    setShown(current => !current)
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
    event.preventDefault();
    var form = document.getElementsByName("loginForm")[0]
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const result = {
      "email" : "vijay@gmail.com",
      "password" : "vijay"
    }
    console.log(JSON.stringify(result));
    postDetails(JSON.stringify(result),form,event)
  };

  async function postDetails(data,form,event){
    const response = await fetch("/api/login",{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : data
    })
    if(response.ok){
        let result = JSON.parse(data);
        // let email = result[email];
        console.log("It worked, creating cookie ");
        createCookie(sessionCookie, "vijay@gmail.com" , 24);
        console.log(response)
        checkAndRedirectToApplication();
    }
  }

  

  function checkAndRedirectToApplication() {
    if (getCookie(sessionCookie) != undefined ) {
      console.log("User has session..")
      return navigate('/dashboard', {replace : true})
    } else {
      console.log("User donot have a session!");
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
            <LoginIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box name="loginForm" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl variant="outlined" sx = {{mt:2}} required fullWidth>
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                  {/* <Router>
                    <Routes>
                      <Route exact path="/Register" element={<Register/>}></Route>
                    </Routes>
                  </Router> */}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}