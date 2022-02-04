import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import axios from "axios";
import Initial from "./components/application/Initial/Initial";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
    {/* <div>Hello</div> */}
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/" element />
          <Route path="/projects" element />
          <Route path="/resources" element />
          <Route path="/events" element />
          <Route path="/portal" element={<Initial/>} />
          <Route path="/team" element />
          <Route path="/subscribe" element />
        </Routes>
      </Router>
    </>
  );
};

export default App;
