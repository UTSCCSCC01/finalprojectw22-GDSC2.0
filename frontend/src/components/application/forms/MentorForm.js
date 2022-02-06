import React from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./MentorForm.css";
// import FormGroup from "react-bootstrap/esm/FormGroup";

const MentorForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <h1 className="sapp">Mentor Application</h1>
      <div className="sapp-div">
        <Form className="student-form">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Col>
              <Form.Label column sm={10}>
                Full Name
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="email" placeholder="Full Name" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Student Number
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="password" placeholder="Student Number" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                UofT email Address
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="password" placeholder="UofT email address" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                CGPA
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="password" placeholder="CGPA" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Program of Study
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Year
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Second Year"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Third Year"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Fourth Year or above"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Resume
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="file" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={10}>
                Have you completed a PEY term?
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Tell us about your past/current Internship Experience(s)!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Tell us about your past/current Extra-Curricular and/or
                Leadership Experience(s)!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Tell us about any software related projects you may have!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Feel free to attach any of your projects here!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="file" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                What programming languages have you worked with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Which Frameworks have you worked with?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                What Databases have you used
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                What Platforms are you familiar with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Provide us with your Github, Devpost, Portfolio, etc. links
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="foémHorizontalPassword"
          >
            <Col>
              <Form.Label column sm={10}>
                Is there anything else you'd like us to know
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 5 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group> */}

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 5 }}>
              <Button variant="outline-success" size="lg" type="submit">
                Apply!{" "}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
export default MentorForm;
