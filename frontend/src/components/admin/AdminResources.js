import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import AppModule from "../../css/admin/Application.module.css";
import React from "react";
import { useState, useEffect } from "react";

function AdminResources() {
  return (
    <>
      {/* <ResourceActions /> */}
      <Resources />
    </>
  );
}

function Resources() {
  let resource = {
    section: "Recordings",
    name: "workshop",
    link: "www.google.com",
    description: "random randomrandom randomrandom random",
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
  const initResourceInfo = {
    section: null,
    name: null,
    link: null,
    description: null,
  };

  // list of resources to display

  // store the information to show in modal
  const [resourceInfo, setResourceInfo] = useState(initResourceInfo);

  // show modal when state is true
  const [resourceModal, setResourceModal] = useState(false);

  const handleViewResource = (resource) => {
    setResourceInfo(resource);
    setResourceModal(true);
  };

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

  const [section, setSection] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [AddResourceModal, setAddResourceModal] = useState(false);
  const [id, setId] = useState(15);

  const handleAddResource = () => {
    setResourcesState((prev) => [
      ...prev,
      {
        id: id,
        section: section,
        name: name,
        link: link,
        description: desc,
      },
    ]);

    setId((prev) => prev + 1);
    setAddResourceModal(false);
  };

  return (
    <>
      <div className="text-center mt-2">
        <Button onClick={() => setAddResourceModal(true)} variant="success">
          Add Resource
        </Button>

        <Modal
          show={AddResourceModal}
          onHide={() => setAddResourceModal(false)}
          className="d-flex flex=column "
          dialogClassName={`${AppModule.dialog_width}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <input
                placeholder="Section"
                onChange={(e) => setSection(e.target.value)}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex w-100">
              <h1 className="ms-2 mt-auto">{}</h1>
              <h4
                className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}
              >
                <input
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </h4>
            </div>
            <hr></hr>
            <Row xs={1} md={1} className="g-4 ms-2">
              <div>
                <b>Link :</b>{" "}
                <input
                  placeholder="Link"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div>
                <b>Description :</b>{" "}
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </Row>
            {/* <Row className="g-4 ms-2 mt-1">
              <div>
                <b>UofT email :</b> {studentInfo.ut_email}
              </div>
              <div>
                <b>Profile Link :</b> {studentInfo.profile_link}
              </div>
            </Row> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              <Button variant="success" onClick={handleAddResource}>
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      <Container fluid className="mt-3">
        {Array.from(getSections()).map((section) => {
          return (
            <div key={section}>
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
                            {r.description.length > 15
                              ? r.description.substring(0, 15).concat("...")
                              : r.description}
                          </h6>
                          <div className="d-flex m-2 justify-content-around">
                            <Button
                              variant="secondary"
                              onClick={() => handleViewResource(r)}
                            >
                              View
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
            </div>
          );
        })}

        <Modal
          show={resourceModal}
          onHide={() => setResourceModal(false)}
          className="d-flex flex=column "
          dialogClassName={`${AppModule.dialog_width}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>Resource Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex w-100">
              <h1 className="ms-2 mt-auto">{resourceInfo.section}</h1>
              <h4
                className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}
              >
                {resourceInfo.name}
              </h4>
            </div>
            <hr></hr>
            <Row xs={1} md={1} className="g-4 ms-2">
              <div>
                <b>Link :</b> {resourceInfo.link}
              </div>
              <div>
                <b>Description :</b> {resourceInfo.description}
              </div>
            </Row>
            {/* <Row className="g-4 ms-2 mt-1">
              <div>
                <b>UofT email :</b> {studentInfo.ut_email}
              </div>
              <div>
                <b>Profile Link :</b> {studentInfo.profile_link}
              </div>
            </Row> */}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary me-auto" onClick={handleShowModal}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={handleShowModal}>
              Dont Save
            </Button> */}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

// function ResourceActions() {
//   const [section, setSection] = useState("");
//   const [name, setName] = useState("");
//   const [link, setLink] = useState("");
//   const [desc, setDesc] = useState("");
//   const [AddResourceModal, setAddResourceModal] = useState(false);

//   const handleAddResource = () => {
//     resourcesState.push({
//       section: section,
//       name: name,
//       link: link,
//       description: desc,
//     });
//   };
//   return (
//     <>
//       <div className="text-center mt-2">
//         <Button onClick={() => setAddResourceModal(true)} variant="success">
//           Add Resource
//         </Button>

//         <Modal
//           show={AddResourceModal}
//           onHide={() => setAddResourceModal(false)}
//           className="d-flex flex=column "
//           dialogClassName={`${AppModule.dialog_width}`}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>
//               <input
//                 placeholder="Section"
//                 onChange={(e) => setSection(e.target.value)}
//               />
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="d-flex w-100">
//               <h1 className="ms-2 mt-auto">{}</h1>
//               <h4
//                 className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}
//               >
//                 <input
//                   placeholder="Name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </h4>
//             </div>
//             <hr></hr>
//             <Row xs={1} md={1} className="g-4 ms-2">
//               <div>
//                 <b>Link :</b>{" "}
//                 <input
//                   placeholder="Link"
//                   onChange={(e) => setLink(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <b>Description :</b>{" "}
//                 <input
//                   onChange={(e) => setDesc(e.target.value)}
//                   placeholder="Description"
//                 />
//               </div>
//             </Row>
//             {/* <Row className="g-4 ms-2 mt-1">
//               <div>
//                 <b>UofT email :</b> {studentInfo.ut_email}
//               </div>
//               <div>
//                 <b>Profile Link :</b> {studentInfo.profile_link}
//               </div>
//             </Row> */}
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="text-center">
//               <Button variant="success" onClick={handleAddResource}>
//                 Submit
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// }

export default AdminResources;
