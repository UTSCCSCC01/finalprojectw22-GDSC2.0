import React, { useState, useEffect } from "react";
import axios from "axios";

const ResourceFilter = ({ resources }) => {
  const [filter, setFilter] = useState("");

  const search = (event) => {
    setFilter(event.target.value);
  };

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

  let dataSearch = (section) =>
    resourcesState.filter((item) => {
      return (
        Object.keys(item)
          .filter((elem) => elem != "_id")
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
                <a
                  href={item.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card p-0 overflow-hidden h-100 shadow">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                  </div>
                </a>
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
  );
};

export default ResourceFilter;
