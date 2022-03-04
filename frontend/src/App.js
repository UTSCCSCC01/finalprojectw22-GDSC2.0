import "./App.css";
import { useEffect, useState,useCallback} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register/Register"
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
import AdminPage from "./components/admin/AdminPage";
import AdminLogin from "./components/admin/AdminLogin";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import GeneralPage from "./components/General/GeneralPage";
import AdminProfiles from "./components/AdminProfiles/AdminProfiles";
import BugReportForm from "./components/BugReport/BugReportForm";
import DarkModeState from "./context/darkMode/DarkModeState"



const App = () => {
  const [portalActive,setPortalActive] = useState(false);
  useEffect(()=>{
    axios.get("/getPortalStatus")
    .then((res)=>{
      setPortalActive(res.data.active);
    })
  },[])
  return (
    <>
      <DarkModeState>
      <Navbarmenu />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element />
          <Route path="/resources" element />
          <Route path="/events" element />
          <Route path="/reportBug" element={<BugReportForm />}/>
          <Route path="/team" element={<Team />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/portal" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="portal/:id" element={portalActive?<Initial />:<PageNotFound/>} />
          <Route path="portal/:id/student/app/" element={portalActive?<StudentForm />:<PageNotFound />} />
          <Route path="portal/:id/mentor/app/" element={portalActive?<MentorForm />:<PageNotFound/>} />
          <Route path="/admin/main" element={<AdminPage />}/>
          <Route path="/general/main" element={<GeneralPage />} />
          <Route path="/admin/log" element={<AdminLogin />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/adminProfiles" element={<AdminProfiles />} />
        </Routes>
      </Router>
      </DarkModeState>
    </>

  );
};

export default App;
