import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPage from "./components/admin/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin_page" element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
};


export default App;