import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import AppModule from "../../css/admin/Application.module.css";
import React from "react";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";

function AdminEvents() {
  return (
    <Container>
      <h2>Events</h2>
      <Events />
    </Container>
  );
}

function Events() {
  let sample_resources = [];

  const [resourcesState, setResourcesState] = useState([]);
  // useLocalStorage("id", sample_resources);

  const initResourceInfo = {
    event_date: "",
    name: "",
    link: "",
    description: "",
    location: "",
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
    let events = new Set();

    for (var i = 0; i < resourcesState.length; i++) {
      events.add(resourcesState[i].event_date.trim().toLowerCase());
    }
    return events;
  };

  let handleDelete = (resource) => {
    setResourcesState((prev) =>
      prev.filter((r) => {
        return r.id !== resource;
      })
    );
  };

  let handleHide = () => {
    setAddResourceModal(false);
    setFormErrors(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const [formValues, setFormValues] = useState(initResourceInfo);

  const [AddResourceModal, setAddResourceModal] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [id, setId] = useState(15);

  const handleAddResource = () => {
    if (
      formValues.event_date === "" ||
      formValues.name === "" ||
      formValues.link === "" ||
      formValues.description === "" ||
      formValues.location === ""
    ) {
      setFormErrors(true);
      return;

    } else {
      axios
        .post(
          "/eventSubmit",
          {
            data: {
              name: formValues.name,
              event_date: formValues.event_date,
              link: formValues.link,
              description: formValues.description,
              location: formValues.location,
            },
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
    setResourcesState((prev) => [
      ...prev,
      {
        id: id,
        event_date: formValues.event_date.trim(),
        name: formValues.name.trim(),
        link: formValues.link.trim(),
        description: formValues.description.trim(),
        location: formValues.location.trim(),
      },
    ]);

    setId((prev) => prev + 1);
    setAddResourceModal(false);
    setFormValues(initResourceInfo);
    setFormErrors(false);
  };

  return (
    <>
      <div className="text-center mt-4" style={{height:"100vh"}}>
        <Button
          size="lg"
          onClick={() => setAddResourceModal(true)}
          variant="secondary"
        >
          Add Event
        </Button>

        <Modal
          show={AddResourceModal}
          onHide={handleHide}
          className="d-flex flex=column "
          dialogClassName={`${AppModule.dialog_width}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formErrors && (
              <h3 style={{ color: "red" }} className="text-center">
                Missing Form
              </h3>
            )}
            <Form.Group as={Row} className="mb-3" controlId="idea">
              <Col>
                <Form.Label for="name" column sm={10}>
                  Name
                </Form.Label>
              </Col>
              <Col sm={15}>
                <Form.Control
                  value={formValues.name}
                  name="name"
                  id="name"
                  onChange={handleChange}
                  maxLength="15"
                  type="text"
                  placeholder="Your answer"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="idea">
              <Col>
                <Form.Label for="event_date" column sm={10}>
                  Date
                </Form.Label>
              </Col>
              <Col sm={15}>
                <Form.Control
                  id="event_date"
                  value={formValues.event_date}
                  name="event_date"
                  type="text"
                  maxLength="20"
                  placeholder="Your answer"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="idea">
              <Col>
                <Form.Label forcolumn sm={10}>
                  Link
                </Form.Label>
              </Col>
              <Col sm={15}>
                <Form.Control
                  value={formValues.link}
                  name="link"
                  onChange={handleChange}
                  type="text"
                  placeholder="Your answer"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="idea">
              <Col>
                <Form.Label for="desc" column sm={10}>
                  Description
                </Form.Label>
              </Col>
              <Col sm={15}>
                <Form.Control
                  id="desc"
                  value={formValues.description}
                  name="description"
                  as="textarea"
                  maxLength="60"
                  placeholder="Your answer"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="idea">
              <Col>
                <Form.Label for="location" column sm={10}>
                  Location
                </Form.Label>
              </Col>
              <Col sm={15}>
                <Form.Control
                  id="location"
                  value={formValues.location}
                  name="location"
                  as="textarea"
                  maxLength="30"
                  placeholder="Your answer"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
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
        {Array.from(getSections()).map((event_date) => {
          return (
            <div key={event_date}>
              <Row xs={1} md={1} className="g-4 mt-2">
                <h1>{event_date}</h1>
                <hr></hr>
              </Row>
              <Row xs={1} md={3} className="g-4">
                {resourcesState
                  .filter((r) => {
                    console.log(r);
                    return r.event_date.toLowerCase() === event_date;
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
            <Modal.Title>Event Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex w-100">
              <h1 className="ms-2 mt-auto">{resourceInfo.event_date}</h1>
              <h4
                className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}
              >
                {resourceInfo.name}
              </h4>
            </div>
            <hr></hr>
            <Row xs={1} md={1} className="g-4 ms-2">
              <div>
                <b>Link :</b>{" "}
                <a className="h6" variant="secondary" href={resourceInfo.link}>
                  {resourceInfo.link}
                </a>
              </div>
              <div>
                <b>Description :</b> {resourceInfo.description}
              </div>
              <div>
                <b>Location :</b> {resourceInfo.location}
              </div>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default AdminEvents;
