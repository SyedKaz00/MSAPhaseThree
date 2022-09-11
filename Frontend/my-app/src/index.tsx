import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import Home from './home';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
    domain="dev-n2jtarjd.us.auth0.com"
    clientId="LnYbL8zo7iqCgti0teD73zNskFxZzdCC"
    redirectUri={'http://localhost:3000/app'}
  >
    <Home />
  </Auth0Provider>,
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
