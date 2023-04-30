import React  from 'react';
import './App.css';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import Login from './Pages/Login'
import Home from "./Pages/Home";

export default function App() {
    const isAuthenticated = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
