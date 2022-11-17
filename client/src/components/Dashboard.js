import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "../App.css"
import { CssBaseline, Fab, Grid } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link } from 'react-router-dom';

function Dashboard() {
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

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
          sx={{
            margin : 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >
        {/* <Typography color={"white"} display={"flex"} alignItems={"center"} sx={{p:2}} component="h1" variant="h5">
            Dashboard </Typography> */}

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