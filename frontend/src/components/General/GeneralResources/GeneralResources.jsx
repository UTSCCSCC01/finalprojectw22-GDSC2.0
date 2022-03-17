
import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ResourceFilter from "./ResourceFilter";
import axios from "axios";

function GeneralResources() {
  return (
    <Container>
      <ResourceFilter />
      {/* {[...getSections()].map((section) => (
        <>
          <h2>{section}</h2>
        </>
      ))} */}

      {/* <ResourceFilter />
      <br />
      <br />
      <h2>Files</h2>
      <FileFilter />
      <br />
      <br />
      <h2>Graphic</h2>
      <GraphicFilter />
      <br />
      <br /> */}
    </Container>
  );
}

export default GeneralResources;
