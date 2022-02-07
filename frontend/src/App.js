import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbarmenu from "./components/Navbarmenu/Navbarmenu";
import Homepage from "./components/Homepage/Homepage";
import About from "./components/About/About";
import Subscribe from "./components/Subscribe/Subscribe";
import ContactUs from "./components/ContactUs/ContactUs";
import Team from "./components/Team/Team";
import Initial from "./components/application/Initial/Initial";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/application/forms/StudentForm";
import MentorForm from "./components/application/forms/MentorForm";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const App = () => {
  return (
    <>
      <Navbarmenu />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element />
          <Route path="/resources" element />
          <Route path="/events" element />
          <Route path="/portal" element />
          <Route path="/team" element={<Team />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="portal/:id" element={<Initial />} />
          <Route path="portal/:id/student/app/" element={<StudentForm />} />
          <Route path="portal/:id/mentor/app/" element={<MentorForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>

  );
};

export default App;