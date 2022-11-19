import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "../App.css"
import { CssBaseline, Fab, Grid } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import LogoutIcon from '@mui/icons-material/Logout';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
const clientId = "972097787217-ieg349lso79987fd96uk8odr06onncgk.apps.googleusercontent.com"
function Dashboard() {

  const navigate = useNavigate()
  const {state} = useLocation()
  const {authProvider,response} = state;
  console.log("In dashboard: AuthProvider: " + authProvider)
  // console.log("In dashboard: " + response["name"])
  // var jsonData = JSON.parse(response)
  console.log("In dashboard: "+ response["session"])
  const [camValue,setCamValue] = useState(true)
  const [visible,setVisible] = useState(true)




  console.log(camValue)
        // $(function() {
        //   $('#test').on('click', function(e) {
        //     e.preventDefault()
        //     $.getJSON('/api/release',
        //         function(data) {
        //       //do nothing
        //     });
        //     return false;
        //   });
        // });


  const theme = createTheme({
    palette: {
      background:{
          default : "#001E3C"
        },
    },
  
  });

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



  const onLogoutSuccess = ()=>{
    alert("Logged out successfully")
    removeCookie("session")
    return navigate("/",{replace:true})
  }
  const onFailure = ()=>{
    console.log("Cannot logout due to some unknown error")
  }

  const {signOut} = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure
  }) 

  // var cookieValue = getCookie("session")
  // if (cookieValue == undefined ) {
  //   console.log("User has session..")
  //   return navigate('/dashboard', {replace:true})
  // } else {
  //   console.log("User donot have a session!");
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          mt : 2,
          ml : 2,
          mr:2,
          display:'flex',
          flexDirection : 'column',
          alignItems : 'end'
        }}
      >
      <Fab onClick={signOut} sx={{ml:2}} id="test" style = {{backgroundColor : "#1976d2"}} aria-label="add" >
            <LogoutIcon style = {{color : 'white'}}  />
            </Fab>
      </Box>
      <Box
          sx={{
            margin : 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
          
          {authProvider=="google"?<Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            Welcome {response["name"]} </Typography>:<Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            Welcome User </Typography>}
          
          

          <img src='http://localhost:5000//api//video_feed'  alt="Video" className='videofeed' />
          {/* <img src = {`${async () => {await fetch("/api/video_feed")}}`} alt="video" /> */}
          <Grid sx={{mt:1}} spacing={2} container direction = "row" display={"flex"}  justifyContent="center" alignItems = "center">
            <Grid item >
            <Button  style = {{backgroundColor : "#42a5fc", color:"black"}} variant="contained">SPEECH</Button>
            </Grid>
            <Grid  item>
          <Fab sx={{ml:2}} id="test" style = {{backgroundColor : "#3D3D3D"}} aria-label="add">
            <FiberManualRecordIcon style = {{color : 'red'}}  />
          </Fab>
          </Grid>
          </Grid>


        </Box>

        
      
    </ThemeProvider>
  )
}

export default Dashboard