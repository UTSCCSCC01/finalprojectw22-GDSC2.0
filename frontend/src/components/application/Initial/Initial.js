import React from "react";
import "./Initial.css";
// import Button from '@mui/material/Button';
import Button from "react-bootstrap/Button";
// import Button from "../common/Button";

const Initial = () => {
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
      <div class="container">
        <h1>Welcome [Name of User]...</h1>
        <div class="sub">
          <Button size="large" variant="outline-success">
            Student Application
          </Button>
          <div class="vl"></div>
          <Button size="large" variant="outline-danger">
            Mentor Application
          </Button>
        </div>
      </div>
    </>
  );
};

export default Initial;
