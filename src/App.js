import "./App.css";
import './assets/Fonts.css';
import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import NotFound from './components/NotFound'
 
function App() {
    return (
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            {/* <Route path="*" element={<NotFound/>}/> */}
          </Routes>
    )
}

export default App;
