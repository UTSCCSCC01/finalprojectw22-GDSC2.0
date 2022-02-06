import React, {useState, useEffect} from "react";
import AppModule from "../../css/admin/Application.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"

const sample = {
    name:"Litao Chen",
    year:"5",
    group:"Yes",
    cgpa:4.5,
    projectIdea:"No Idea."
}
const samples = [];

export default function AdminApplication (){
    return (
        <div className="d-flex">
            <Filter/>
            <Applicants/>
        </div>
    );
}

function Applicants(){
    for (let i = 0; i < 5; i++){
        samples[i] = {...sample,id:i};
    }

    return (
        <Container fluid>
            <Row xs={1} md={2} className="g-4 ms-2">
                {samples.map((student) => (
                    <Col key={student.id} className={AppModule.card_fit_content}>
                    <Card className={`p-2 ${AppModule.card_height}`}>
                        <div className="d-flex">
                            <h4 className="mt-auto mb-auto">{student.name}</h4>
                            <Button variant="secondary" className={`${AppModule.align_end}`}>View</Button>
                        </div>
                        <div className="d-flex row">
                            {Object.keys(student).filter((key)=>(key != "id")).map((key)=>(
                                <p key={key} className="w-50 ps-3">{key} : {student[key]}</p>
                            ))}
                        </div>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

function Filter(){
    return (
        <div className={`d-flex flex-column ${AppModule.filter_container}`}>
            <div className="d-flex justify-content-center">
            <h4>Filter</h4>
            <div className={AppModule.align_end}>
                <Button variant="secondary"> Clear </Button>
            </div>
            </div>
            <hr></hr>
            <h5>Role</h5>
            <Form>
                {["All","Student","Mentor"].map((type)=>(
                    <Form.Check label={type} key={type} name="role" type="radio" id={type}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Year of Study</h5>
            <Form>
                {["All","Second","Third","Fourth"].map((year)=>(
                    <Form.Check label={year} key={year} name="year" type="radio" id={year}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Database</h5>
            <Form>
                {["Any","SQL","NoSQL","Graph"].map((db)=>(
                        <Form.Check label={db} key={db} name="database" type="checkbox" id={db}/>
                    ))}
            </Form>
            <hr></hr>
            <h5>Cloud Plat</h5>
            <Form>
                {["Any","Google Cloud","Firebase","Heroku","Netlify","Azure"].map((plat)=>(
                        <Form.Check label={plat} key={plat} name="plateform" type="checkbox" id={plat}/>
                    ))}
            </Form>
            <hr></hr>
            <Form className="d-flex align-content-center">
                <Form.Control name="cgpa" type="text" id="cgpa" className={AppModule.text_input}/>
                <Form.Label htmlFor="cgpa" className="mt-auto mb-auto ms-2">CGPA</Form.Label>
            </Form>
            <hr></hr>
            <div className="d-flex">
            <Button className={AppModule.align_end}>Apply</Button>
            </div>
        </div>
    );
}