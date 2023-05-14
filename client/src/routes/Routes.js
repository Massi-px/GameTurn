import React from 'react';
import {BrowserRouter, Route, Navigate, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import authManagerInstance from '../utils/Api/auth.js';

const PrivateRoute = (path,Element) => {
    return (
        <Route path={path} element={authManagerInstance.isAuthenticated() ? Element : <Navigate to="/" />}/>
    );
};

const AppRouter = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login/>} />
                    {PrivateRoute ("/Home", <Home/>)}
                </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
