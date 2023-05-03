import React  from 'react';
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Login from './Pages/Login'
import Home from "./Pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./Pages/SignUp";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/SignUp" element={<SignUp/>} />
                {PrivateRoute('/Home', <Home/>)}
            </Routes>
        </BrowserRouter>
    );
}
