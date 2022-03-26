import React from "react";

const Event = ({ event: e }) => {
  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <a
        href={e.link !== "" ? e.link : ""}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card p-0 overflow-hidden h-100 shadow">
          <div className="card-body">
            <h5 className="card-title">{e.name}</h5>
            <p className="card-text">{e.date}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Event;
