import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register/Register";
import Navbarmenu from "./components/Navbarmenu/Navbarmenu";
import Homepage from "./components/Homepage/Homepage";
import About from "./components/About/About";
import Subscribe from "./components/Subscribe/Subscribe";
import ContactUs from "./components/ContactUs/ContactUs";
import Initial from "./components/application/Initial/Initial";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/application/forms/StudentForm";
import MentorForm from "./components/application/forms/MentorForm";
import AdminPage from "./components/admin/AdminPage";
import AdminLogin from "./components/admin/AdminLogin";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import GeneralPage from "./components/General/GeneralPage";
import AdminProfiles from "./components/AdminProfiles/AdminProfiles";
import BugReportForm from "./components/BugReport/BugReportForm";
import Footer from "./components/Footer/Footer";
import BugReportLogs from "./components/BugReportLogs/BugReportLogs";
import Signout from "./components/Signout/Signout";
import DarkModeState from "./context/darkMode/DarkModeState";
import GeneralResources from "./components/General/GeneralResources/ResourceFilter";
import GeneralEvents from "./components/General/GeneralEvents/GeneralEvents";
import GeneralProjects from "./components/General/GeneralProjects/GeneralProjects";
import StudentTeam from "./components/StudentTeam/StudentTeam";
import axios from "axios";
import SetRoleState from "./context/setRole/SetRoleState";

const App = () => {
  const [portalActive, setPortalActive] = useState(false);
  useEffect(() => {
    axios.get("/getPortalStatus").then((res) => {
      setPortalActive(res.data.active);
    });
  }, []);
  return (
    <>
    <SetRoleState>
      <DarkModeState>
        <Navbarmenu />
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/reportBug" element={<BugReportForm />} />
            {/* <Route path="/reportBugLogs" element={<BugReportLogs />} /> */}
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/portal" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="portal/:id"
              element={portalActive ? <Initial /> : <PageNotFound />}
            />
            <Route
              path="portal/:id/student/app/"
              element={portalActive ? <StudentForm /> : <PageNotFound />}
            />
            <Route
              path="portal/:id/mentor/app/"
              element={portalActive ? <MentorForm /> : <PageNotFound />}
            />
            <Route path="/admin/main" element={<AdminPage />} />
            <Route path="/resources" element={<GeneralResources />} />
            <Route path="/events" element={<GeneralEvents />} />
            <Route path="/pastProjects" element={<GeneralProjects />} />
            {/* <Route path="/general/main" element={<GeneralPage />} /> */}
            <Route path="/admin/log" element={<AdminLogin />} />
            <Route path="/adminProfiles" element={<AdminProfiles />} />
            <Route path="/signOut" element={<Signout />} />
            <Route path="/team/:team_id" element={<StudentTeam />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Footer />
      </DarkModeState>
      </SetRoleState>
    </>
  );
};

export default App;
