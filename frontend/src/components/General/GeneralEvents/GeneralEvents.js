import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";
import { Button, Row, Modal } from "react-bootstrap";
import AppModule from "../../../css/admin/Application.module.css";

const GeneralEvents = () => {
  const initEventInfo = {
    id: "",
    name: "",
    event_date: "",
    description: "",
  };
  const [pastEventState, setPastEventState] = useState([]);
  const [upcomingEventState, setUpcomingEventState] = useState([]);
  const [eventInfo, setEventInfo] = useState({ initEventInfo });
  // show modal when state is true
  const [eventModal, setEventModal] = useState(false);

  let getPastEvents = async () => {
    axios.get("/events/eventGetPast").then((res) => {
      setPastEventState(res.data.events);
    });
  };

  let getUpcomingEvents = async () => {
    axios.get("/events/eventGetUpcoming").then((res) => {
      setUpcomingEventState(res.data.events);
    });
  };

  const handleViewEvent = (event) => {
    console.log(event);
    setEventInfo({
      ...event,
      event_date: event.event_date.substring(0, 10),
      event_time: event.event_date.substring(11, 16),
    });
    setEventModal(true);
  };

  useEffect(() => {
    console.log("useeffect");
    getPastEvents();
    getUpcomingEvents();
  }, []);

  return (
    <>
      <section className="py-4 container">
        <div className="row justify-content-center">
          <h2>Upcoming Events</h2>
          <hr />
          {upcomingEventState.map((e) => {
            return <Event key={e._id} event={e} func={handleViewEvent} />;
          })}

          <h2>Past Events</h2>
          <hr />
          {pastEventState.map((e) => {
            return <Event key={e._id} event={e} func={handleViewEvent} />;
          })}
        </div>
      </section>
      <Modal
        show={eventModal}
        onHide={() => setEventModal(false)}
        className="d-flex flex=column "
        dialogClassName={`${AppModule.dialog_width}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Event Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100">
            <h1 className="ms-2 mt-auto">{eventInfo.name}</h1>
            <h4 className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}>
              {eventInfo.event_date}
            </h4>
          </div>
          <hr></hr>
          <Row xs={1} md={1} className="g-4 ms-2">
            <div>
              <b>Time :</b> {eventInfo.event_time}
            </div>
            <div>
              <b>Link :</b> {eventInfo.link}
            </div>
            <div>
              <b>Description :</b> {eventInfo.description}
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GeneralEvents;
