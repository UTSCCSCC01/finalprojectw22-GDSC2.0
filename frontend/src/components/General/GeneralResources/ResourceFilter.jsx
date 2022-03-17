import React, { useState } from "react";

const ResourceFilter = ({ resources }) => {
  const [filter, setFilter] = useState("");

  const search = (event) => {
    setFilter(event.target.value);
  };

  let dataSearch = resources.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
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

        {dataSearch.map((item, index) => {
          return (
            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResourceFilter;
