import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import authManagerInstance from '../utils/api/auth.js';
import SignUp from "../pages/SignUp";

const PrivateRoute = (path,element) => {
    return (
        <Route path={path} element={authManagerInstance.isAuthenticated() ? element : <Navigate to ='/'/>}/>
    );
};

const AppRouter = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login/>} />
                    <Route exact path="/SignUp" element={<SignUp/>} />
                    {PrivateRoute ("/Home", <Home/>)}
                </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
