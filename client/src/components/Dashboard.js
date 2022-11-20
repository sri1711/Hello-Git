import React, { useState, useEffect } from 'react'
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
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

var text = ""
const clientId = "972097787217-ieg349lso79987fd96uk8odr06onncgk.apps.googleusercontent.com"
function Dashboard() {

  const navigate = useNavigate()
  const {state} = useLocation()
  const [text,setText] = useState("None")
  const {authProvider,response} = state;
  console.log("In dashboard: AuthProvider: " + authProvider)
  // console.log("In dashboard: " + response["name"])
  // var jsonData = JSON.parse(response)
  console.log("In dashboard: "+ response["session"])
  const [camValue,setCamValue] = useState(true)
  const [visible,setVisible] = useState(true)
  // const axios = require('axios');




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


  async function createUser() {
    // const response = await fetch(`/api/get_result`);
    // const text = await response.text();
    // return text;

    const response = await fetch('/api/get_result').then(response => response.text()).then(response => {
      console.log(response)
      setText(text => response)
      console.log("Text: " + text)
    })
  }

  function textToSpeech(){
    var msg = new SpeechSynthesisUtterance('The predicted result is: ' + text);
    window.speechSynthesis.speak(msg);
  }

  useEffect(() => {
    const interval = setInterval(() => {

      createUser()

      
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);

  // async function postDetails(){
  //   const response = await fetch("/api/video_feed",{
  //       method: 'POST',
  //       headers: {
  //           'Content-Type' : 'application/json'
  //       },
  //       body : "demo"
  //   }).then(response => response.text()).then(response => {
  //     console.log("In video"+response)
  //     // const obj = JSON.parse(response)
  //     // const key = Object.keys(obj) 
      
  //     // console.log("Keys: " + Object.keys(obj))
  //     // if(key == "success"){
  //     //   const successMessage = obj["success"];
  //     //   message = successMessage;
  //     //   console.log("Success" + response["success"])
  //     // }
  //     // if(key == "failure"){
  //     //   const failureMessage = obj["failure"];
  //     //   message = failureMessage;
  //     //   console.log("Message: " +message)
  //     //   console.log("Failure: " + obj["failure"])
  //     // }
      
  //   })
  // }

  // var cookieValue = getCookie("session")
  // if (cookieValue == undefined ) {
  //   console.log("User has session..")
  //   return navigate('/dashboard', {replace:true})
  // } else {
  //   console.log("User donot have a session!");
  // }

  // async function new_result(){
  //   useEffect(() => {
  //     let interval = setInterval(() => {
  //       const res = await fetch(`http://localhost:5000/api/get_result`);
  //       console.log("result : "+ res)
  //     }, 2000);
      
  //   }, []);
  // }

  // useEffect(()=>{
  //   var handle=setInterval(getresult,5000);    

  //   return ()=>{
  //     clearInterval(handle);
  //   }
  // });

  // function getresult(){
  //   fetch("http://localhost:5000/api/get_result")
  //     .then(
  //       (result) => {          
  //         console.log("new"+result)
  //       }
  //     );
  // }

  

  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //      axios
  //       .post("http://localhost:5000/api/get_result")
  //       .then(res => {
  //         console.log("axios :" + res)
  //         console.log(res.data)
  //           const data = res.data;
            
  //       })
  //       .catch(error => {
  //           console.log(error);
  //       });
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, []);

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

            {<Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            The predicted result is : {text}</Typography>}
          
          

          <img src="http://localhost:5000//api//video_feed"  alt="Video" className='videofeed' />
          {/* <img src = {`${async () => {await fetch("/api/video_feed")}}`} alt="video" /> */}
          <Grid sx={{mt:1}} spacing={2} container direction = "row" display={"flex"}  justifyContent="center" alignItems = "center">
            <Grid item >
            <Button onClick={textToSpeech} style = {{backgroundColor : "#42a5fc", color:"black"}} variant="contained">SPEECH</Button>
            </Grid>
            <Grid  item>
          <Fab  sx={{ml:2}} id="test" style = {{backgroundColor : "#3D3D3D"}} aria-label="add">
            <FiberManualRecordIcon style = {{color : 'red'}}  />
          </Fab>
          </Grid>
          </Grid>


        </Box>

        {/* <Get url="/api/get_result">
        {(error, response, isLoading, makeRequest, axios) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            return (<div>{response}</div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get> */}

        
      
    </ThemeProvider>
  )
}

export default Dashboard