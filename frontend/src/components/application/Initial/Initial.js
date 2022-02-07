import React from "react";
import "./Initial.css";
// import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
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
      <div className="initial-header">
        <h1>Welcome {id}</h1>
      </div>
      <div className="initial-container">
        <div className="initial-child">
          <Button
            onClick={() => nav(`student/app`)}
            size="large"
            variant="outline-primary"
          >
            Student Application
          </Button>
          <ProgressBar animated variant="info" now={45} />
        </div>

        <div className="vl"></div>
        <div className="initial-child">
          <Button
            onClick={() => nav(`mentor/app`)}
            size="large"
            variant="outline-warning"
          >
            Mentor Application
          </Button>
          <ProgressBar animated variant="success" now={75} />
        </div>
      </div>
    </>
  );
};

export default Initial;
