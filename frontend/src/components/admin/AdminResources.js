import { Button, Container, Row, Col, Card } from "react-bootstrap";
import AppModule from "../../css/admin/Application.module.css";
import React from "react";
import { useState, useEffect } from "react";

function AdminResources() {
  return (
    <>
      <ResourceActions />
      <Resources />
    </>
  );
}

function ResourceActions() {
  return (
    <>
      <div className="text-center mt-2">
        <Button variant="success">Add Resource</Button>
      </div>
    </>
  );
}

function Resources() {
  let resource = {
    section: "Recordings",
    name: "workshop",
    link: "www.google.com",
    description: "random random",
  };

  let resource2 = {
    section: "Files",
    name: "sample react",
    link: "www.google.com",
    description: "some files",
  };

  let resource3 = {
    section: "Graphics",
    name: "sample react",
    link: "www.google.com",
    description: "some pictures",
  };

  let sample_resources = [];
  //   let resources2 = [];

  for (let i = 0; i < 5; i++) {
    sample_resources.push({ ...resource, id: i });
  }
  for (let i = 5; i < 10; i++) {
    sample_resources.push({ ...resource2, id: i });
  }

  for (let i = 10; i < 15; i++) {
    sample_resources.push({ ...resource3, id: i });
  }

  const [resourcesState, setResourcesState] = useState(sample_resources);

  //   useEffect(() => {
  //       effect
  //       return () => {
  //           cleanup
  //       };
  //   }, [input]);

  //   setResourcesState(sample_resources);

  let getSections = () => {
    let sections = new Set();

    for (var i = 0; i < resourcesState.length; i++) {
      sections.add(resourcesState[i].section);
    }
    console.log(sections);
    return sections;
  };

  let handleDelete = (resource) => {
    console.log(resourcesState);
    console.log(resource);
    const newResources = resourcesState.filter((r) => {
      return r.id !== resource;
    });

    setResourcesState(newResources);
  };

  return (
    <>
      <Container fluid className="mt-3">
        {Array.from(getSections()).map((section) => {
          return (
            <>
              <Row xs={1} md={1} className="g-4 mt-2">
                <h1>{section}</h1>
                <hr></hr>
              </Row>
              <Row xs={1} md={4} className="g-4">
                {resourcesState
                  .filter((r) => {
                    console.log(r.name);
                    return r.section === section;
                  })
                  .map((r) => {
                    return (
                      <Col
                        key={r.id}
                        className={`text-center ${AppModule.card_fit_content}`}
                      >
                        <Card className={`p-2 h-auto`}>
                          <div className="d-flex m-auto">
                            <h3 className="text-center">{r.name}</h3>
                          </div>
                          <h6 className={`${AppModule.role_text_color}`}>
                            {r.description}
                          </h6>
                          <div className="d-flex m-2 justify-content-around">
                            <Button
                              variant="secondary"
                              // onClick={() => handleEdit(student)}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => handleDelete(r.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </>
          );
        })}
      </Container>
    </>
  );
}

export default AdminResources;
