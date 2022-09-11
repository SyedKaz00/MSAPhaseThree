import React, { useState } from "react";
import './App.css';
import {
  Box,
  Grid,
} from "@mui/material";
//TODO MAke in to GRID, Ad Break points, Add fluid animation in background
import FluidAnimation from 'react-fluid-animation'

import LoginButton from "./login";
function Splash() {

  return (
    <Grid
    container
    spacing={0}
    direction="row"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '20vh' }}
  >
    
    <Grid item sm={6} xs={12} style={{textAlign: "center"}}>
      <div><h1>Calculate Crypto Gains/Losses</h1>
    <LoginButton />
    </div>
    </Grid>   
     <Grid item sm={6} xs={12}>
     <FluidAnimation style={{ height: '100vh', width: '100%'}} />
     </Grid>
  </Grid> 
  );
}

export default Splash;
