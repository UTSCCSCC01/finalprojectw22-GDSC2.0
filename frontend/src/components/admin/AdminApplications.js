import React, {useState}from "react";
import AppModule from "../../css/admin/Application.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
const sample = {
    name:"Litao Chen",
    year:"5",
    group:"Yes",
    cgpa:4.5,
    projectIdea:"Yes"
}
const samples = [];

const application_info = {
    name: "Litao Chen",
    student_number: "1000000000",
    ut_email : "student@mail.utoronto.ca",
    cgpa : "4.5",
    program: "CS",
    year: "5",
    resume: "some url",
    group: "yes",
    group_name: "GDSC2.0",
    program_language: "python,java,C,C#,html,css,java script,haskell, racket, assemblysbdhjasbvdjhbsdj",
    frameworks: " Nodejs, React, Flask, Django, and Spring.",
    database: "SQL,NOSQL,GRAPH",
    cloud_platform: "AWS,heoku,google cloud,Azure",
    profile_link: "some url",
    project_idea: "yes",
    project_description: "A very long text",
    additional_info: "I don't know why I am applying for this."
}
const init_info = {
    name: null,
    student_number: null,
    ut_email : null,
    cgpa : null,
    program: null,
    year: null,
    resume: null,
    group: null,
    group_name: null,
    program_language: null,
    frameworks: null,
    database: null,
    cloud_platform: null,
    profile_link: null,
    project_idea: null,
    project_description: null,
    additional_info: null
}

export default function AdminApplication (){
    return (
        <div className="d-flex">
            <Filter/>
            <Applicants/>
        </div>
    );
}

function Applicants(){
    const [studentInfo, setInfo] = useState(init_info);
    const [showModal, setShowModal] = useState(false);
    const handleClick= (student)=>{
        setInfo(student)
        setShowModal(true)
    }
    const text_group = {
        program_language: "Program Language",
        frameworks: "Frameworks",
        database: "Databases",
        cloud_platform: "Cloud Platforms"
    }

    for (let i = 0; i < 20; i++){
        samples[i] = {...sample,id:i};
    }
    return (
        <Container fluid>
            <Row xs={1} md={2} className="g-4 ms-2">
                {samples.map((student) => (
                    <Col key={student.id} className={AppModule.card_fit_content}>
                    <Card className={`p-2 h-auto`}>
                        <div className="d-flex">
                            <h4 className="mt-auto mb-auto">{student.name}</h4>
                            <Button variant="secondary" className={`${AppModule.align_end}`} onClick={()=>handleClick(application_info)}>View</Button>
                        </div>
                        <div className="d-flex row">
                            {Object.keys(student).filter((key)=>((key !== "id")&&(key !== "name"))).map((key)=>(
                                <p key={key} className="w-50 ps-3">{key} : {student[key]}</p>
                            ))}
                        </div>
                    </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={()=>setShowModal(false)} className = "d-flex flex=column" dialogClassName={`${AppModule.dialog_width}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Applicant Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex w-100">
                        <h1 className="ms-2">{studentInfo.name}</h1>
                        <Button variant="primary" className={`${AppModule.resume_button}` }>Resume</Button>
                    </div>
                    <hr></hr>
                    <Row xs={1} md={2} className="g-4 ms-2">
                        <div><b>Student # :</b> {studentInfo.student_number}</div>
                        <div><b>Year :</b> {studentInfo.year}</div>
                        <div><b>CGPA :</b> {studentInfo.cgpa}</div>
                        <div><b>Program :</b> {studentInfo.program}</div>
                        <div><b>Group :</b> {studentInfo.group}</div>
                        <div><b>Group Name :</b> {studentInfo.group_name}</div>
                    </Row>
                    <Row className="g-4 ms-2 mt-2">
                        <div><b>UofT email :</b> {studentInfo.ut_email}</div>
                        <div><b>Profile Link :</b> {studentInfo.profile_link}</div>
                    </Row>
                    <hr></hr>
                    {Object.keys(text_group).map((key)=>(
                        <Row className="ms-2 mb-4" key={key}>
                            <Col sm={3}><b>{text_group[key]}</b></Col>
                            <Col sm={9}>{studentInfo[key]}</Col>
                        </Row>
                    ))}
                    <hr></hr>
                    <Row className="g-4 ms-2">
                        <div>
                            <div className="mb-2"><b>Project Description</b></div>
                            <div>{studentInfo.project_description}</div>
                        </div>
                        <div>
                            <div className="mb-2"><b>Additional Information</b></div>
                            <div>{studentInfo.additional_info}</div>
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>setShowModal(false)}>
                    Accept
                    </Button>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                    Reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

function Filter(){
    return (
        <div className={`d-flex flex-column ${AppModule.filter_container} `}>
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