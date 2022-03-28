import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Modal } from "react-bootstrap";
import AppModule from "../../../css/admin/Application.module.css";

const ResourceFilter = ({ resources }) => {
  const [filter, setFilter] = useState("");

  const search = (event) => {
    setFilter(event.target.value);
  };

  const initResourceInfo = {
    id: "",
    section: "",
    name: "",
    link: "",
    description: "",
  };

  const [resourcesState, setResourcesState] = useState([]);
  const [resourceInfo, setResourceInfo] = useState(initResourceInfo);
  // show modal when state is true
  const [resourceModal, setResourceModal] = useState(false);

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

  const handleViewResource = (resource) => {
    console.log(resource);
    setResourceInfo(resource);
    setResourceModal(true);
  };

  let dataSearch = (section) =>
    resourcesState.filter((item) => {
      return (
        Object.keys(item)
          .filter((elem) => elem !== "_id")
          .some((key) => {
            console.log(Object.keys(item));
            return item[key]
              .toString()
              .toLowerCase()
              .includes(filter.toString().toLowerCase());
          }) && item.section === section
      );
    });

  return (
    <>
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12 mb-5">
            <div className="mb-3 col-4 mx-auto text-center">
              <input
                type="text"
                className="form-control"
                placeholder="Filter"
                value={filter}
                onChange={search.bind(this)}
              />
            </div>
          </div>
          {[...getSections()].map((section) => {
            console.log(resourcesState);
            let data = dataSearch(section).map((item, index) => {
              return (
                <div key={index} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                  <div className="card p-0 overflow-hidden h-100 shadow text-center">
                    <div className="card-body">
                      <a
                        href={item.link}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <h5 className="card-title">{item.name}</h5>
                      </a>
                      <p className="card-text">{item.description}</p>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewResource(item)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              );
            });
            console.log(data.length);

            return (
              data.length > 0 && (
                <>
                  <h2>{section}</h2>
                  <hr />
                  {data}
                </>
              )
            );
          })}
        </div>
      </section>
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
            <h4 className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}>
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
    </>
  );
};

export default ResourceFilter;
