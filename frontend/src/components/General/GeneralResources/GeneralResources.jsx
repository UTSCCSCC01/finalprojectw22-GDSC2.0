import React from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import ResourceFilter from "./ResourceFilter";
import FileFilter from "./FileFilter";
import GraphicFilter from "./GraphicFilter";

function GeneralResources() {

    return (
        <Container>
            <h2>Resources</h2>
            <ResourceFilter />
            <br />
            <br />
            <h2>Files</h2>
            <FileFilter />
            <br />
            <br />
            <h2>Graphic</h2>
            <GraphicFilter />
            <br />
            <br />
        </Container>
    );
}


export default GeneralResources;