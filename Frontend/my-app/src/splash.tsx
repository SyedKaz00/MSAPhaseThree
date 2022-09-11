import React, { useState } from "react";
import './App.css';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
//TODO MAke in to GRID, Ad Break points, Add fluid animation in background
import LoginButton from "./login";
function Splash() {

  return (
    <Box>
      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      ><h1>Calculate Crypto Gains/Losses</h1>
      </Box>
      <LoginButton />
    </Box>
  );
}

export default Splash;
