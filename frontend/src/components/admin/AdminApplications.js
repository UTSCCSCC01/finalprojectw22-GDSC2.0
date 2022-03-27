import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Filter from './AdminFilter';
import Applicants from "./Applicants";

const NUM_DISPLAY = 20;

// main container of application page
export default function AdminApplication() {
  const [num_match, setNumMatch] = useState(0);
  const [page_num, setPageNum] = useState(1);
  const handlePageNum = (e) => {
    if (e.target.id === "page_l") {
      if (page_num - 1 > 1) {
        setPageNum(page_num - 1);
      }
    } else if (e.target.id === "page_r") {
      if (page_num * NUM_DISPLAY < num_match) {
        setPageNum(page_num + 1);
      }
    }
  };
  const [applications, setApplications] = useState([]);
  return (
    <div className="d-flex flex-column">
      <Card.Header className="d-flex">
        <div>Application</div>
        <div className="ms-auto me-2">
          {(page_num - 1) * NUM_DISPLAY + 1 > num_match
            ? num_match
            : (page_num - 1) * NUM_DISPLAY + 1}{" "}
          -{" "}
          {page_num * NUM_DISPLAY > num_match
            ? num_match
            : page_num * NUM_DISPLAY}{" "}
          matches (total {num_match})
        </div>
      </Card.Header>
      <Card.Body className="d-flex">
        <Filter updateApplications={setApplications} />
        <Applicants applications={applications} updateApplications={setApplications} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Form className="d-flex align-content-center">
          <Button
            className="me-3 border-0 bg-transparent h-auto text-dark"
            id="page_l"
            onClick={handlePageNum}
          >
            <FaArrowLeft></FaArrowLeft>
          </Button>
          <p className="mt-auto mb-auto">{page_num}</p>
          <Button
            className="ms-3 border-0 bg-transparent h-auto text-dark"
            id="page_r"
            onClick={handlePageNum}
          >
            <FaArrowRight></FaArrowRight>
          </Button>
        </Form>
      </Card.Footer>
    </div>
  );
}