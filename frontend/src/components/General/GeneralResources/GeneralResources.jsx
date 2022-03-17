import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ResourceFilter from "./ResourceFilter";
import axios from "axios";

function GeneralResources() {
  const [resourcesState, setResourcesState] = useState([]);

  let getResources = async () => {
    axios.get("/resources").then((res) => {
      setResourcesState(res.data);
    });
  };

  useEffect(() => {
    console.log("useeffect");
    getResources();
  }, []);

  let getSections = () => {
    let sections = new Set(
      resourcesState.map((r) => r.section.trim().toLowerCase())
    );

    console.log(sections);
    return sections;
  };

  return (
    <Container>
      {[...getSections()].map((section) => (
        <>
          <h2>{section}</h2>
          <ResourceFilter
            resources={resourcesState.filter((r) => r.section === section)}
          />
        </>
      ))}

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
