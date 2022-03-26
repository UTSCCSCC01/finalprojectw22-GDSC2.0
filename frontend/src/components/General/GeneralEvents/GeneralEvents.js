import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";

const GeneralEvents = () => {
  const [pastEventState, setPastEventState] = useState([]);
  const [upcomingEventState, setUpcomingEventState] = useState([]);

  let getPastEvents = async () => {
    axios.get("/events/eventGetPast").then((res) => {
      setPastEventState(res.data);
    });
  };

  let getUpcomingEvents = async () => {
    axios.get("/events/eventGetUpcoming").then((res) => {
      setUpcomingEventState(res.data);
    });
  };

  useEffect(() => {
    console.log("useeffect");
    getPastEvents();
    getUpcomingEvents();
  }, []);

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <h2>Upcoming Events</h2>
        <hr />
        {upcomingEventState.map((e) => {
          return <Event key={e._id} event={e} />;
        })}

        <h2>Past Events</h2>
        <hr />
        {pastEventState.map((e) => {
          return <Event key={e._id} event={e} />;
        })}
      </div>
    </section>
  );
};

export default GeneralEvents;
