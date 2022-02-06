import React from "react";
import "./Initial.css";
// import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Button from "../common/Button";

const Initial = () => {
  let nav = useNavigate();
  let { id } = useParams();
  return (
    <>
      <style type="text/css">
        {`
    .btn-large {
      padding: 10px 20px 10px 20px;
      font-size: 2.5vw;
    }
    
    `}
      </style>
      <div className="container">
        <h1>Welcome {id}</h1>
        <div className="sub">
          <Button
            onClick={() => nav(`/portal/student/app/${id}`)}
            size="large"
            variant="outline-primary"
          >
            Student Application
          </Button>
          <div className="vl"></div>
          <Button
            onClick={() => nav(`/portal/mentor/app/${id}`)}
            size="large"
            variant="outline-warning"
          >
            Mentor Application
          </Button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Initial;
