import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import CreateTournament from "../pages/CreateTournament";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/SignUp" element={<SignUp />} />
                <Route exact path="/Home" element={<Home />} />
                <Route exact path="/Create-Tournament" element={<CreateTournament />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
