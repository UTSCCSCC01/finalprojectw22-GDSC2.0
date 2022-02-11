import React from 'react';
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import "./Subscribe.css"

const Subscribe = () => {
  return (
    <div className='main'>
        <Container>
            <Col>
                <Row>
                    <h3 className='labels'>Join the mailing list to stay updated!</h3>
                    <p className='labels'>*All fields are required</p>
                </Row>
                <Form>
                    <Form.Group className="mb-3 labels" controlId="formBasicEmail" aria-required="true">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group className="mb-3 labels" controlId="formBasicName" aria-required="true">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" />
                    </Form.Group>
                    <Form.Group className="mb-3 labels" controlId="formBasicName" aria-required="true">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 labels" aria-required="true">
                        <Form.Label as="legend" column sm={3}>
                            Year of Study:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="1st Year"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="2nd Year"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                type="radio"
                                label="3rd Year"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                            <Form.Check
                                type="radio"
                                label="4th Year or Higher"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                            />
                        </Col>
                    </Form.Group>
                    <Button className='labels' variant="secondary" type="submit">
                        Subscribe
                    </Button>
                </Form>
            </Col>
        </Container>
    </div>
  )
};

export default Subscribe;
