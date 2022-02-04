import React from "react";
import "./Initial.css";
// import Button from '@mui/material/Button';
import Button from "react-bootstrap/Button";
// import Button from "../common/Button";

const Initial = () => {
  return (
    <div class="container">
      <h1>Welcome [Name of User]...</h1>
      <div class="sub">
        <Button size="lg" variant="outline-primary">
          Student Application
        </Button>
        <Button size="lg" variant="outline-danger">
          Mentor Application
        </Button>
      </div>
    </div>
  );
};

export default Initial;
