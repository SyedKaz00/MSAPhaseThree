import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../loading';
import { useAuth0 } from "@auth0/auth0-react";



import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it
    const { user, isAuthenticated, isLoading } = useAuth0();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoute;