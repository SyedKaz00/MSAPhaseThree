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
import axios from "axios";
import LoadingGif from "../src/loading.gif"
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";
import { Route, Routes } from 'react-router-dom';
import  Loading  from '../src/loading';
import { useAuth0 } from '@auth0/auth0-react';
import Splash from "./splash";

import ProtectedRoute from './auth/protected-route';
import App from "./App";

const Home = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">

      <div className="container flex-grow-1">
        <Routes>
          <Route path="/" element={<Splash/>} />

          
          <Route path='/app' element={<ProtectedRoute/>}>
          <Route  path='/app' element={<App/>}/>
          </Route>

        </Routes>
      </div>
    </div>
  );
};

export default Home;
