import {Route, Navigate } from 'react-router-dom';
import React from "react";

function PrivateRoute (Path, Element) {
    const isLoggedIn = localStorage.getItem('token');
    return (
        <Route path={Path} element={isLoggedIn ? Element : <Navigate to="/" />}/>
    );
}

export default PrivateRoute;