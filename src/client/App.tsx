import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path={'/'} />
        <Route element={<Edit/>} path='/edit/:id' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
