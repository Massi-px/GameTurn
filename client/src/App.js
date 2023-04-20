import React  from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './Pages/Login'
import Home from "./Pages/Home";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}
