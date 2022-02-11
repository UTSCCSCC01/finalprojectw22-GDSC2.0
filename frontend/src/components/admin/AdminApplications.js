import React, {useState,useEffect}from "react";
import AppModule from "../../css/admin/Application.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import {BsDownload} from 'react-icons/bs'

// example student object to display in main page of interface
const student_sample = {
    name:"Litao Chen",
    role: "Student",
    year:"5",
    group:"Yes",
    cgpa:4.5,
    project_idea:"Yes"
}
// example mentor object to display in main page of interface
const mentor_sample = {
    name:"Litao Chen",
    role: "Mentor",
    year:"5",
    group:"Yes",
    cgpa:4.5,
    PEY:"Yes"
}
// array of samples
const samples = [];
// example of student application information
const student_info = {
    name: "Litao Chen",
    role: "Student",
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
// exampple of mentor application information
const mentor_info = {
    name: "Litao Chen",
    role: "Mentor",
    student_number: "1000000000",
    ut_email : "student@mail.utoronto.ca",
    cgpa : "4.5",
    program: "CS",
    year: "5",
    resume: "some url",
    complete_PEY: "no",
    internship_exp: "I did nothing",
    extra_curricular: "what is extra curricular",
    projects: "no project",
    project_link: "some url",
    program_language: "python,java,C,C#,html,css,java script,haskell, racket, assemblysbdhjasbvdjhbsdj",
    frameworks: " Nodejs, React, Flask, Django, and Spring.",
    database: "SQL,NOSQL,GRAPH",
    cloud_platform: "AWS,heoku,google cloud,Azure",
    profile_link: "some url",
    additional_info: "I don't know why I am applying for this."
}
// an application with all null value to reset data and avoid undefined 
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

// main container of application page
export default function AdminApplication (){
    return (
        <div className="d-flex">
            <Filter/>
            <Applicants/>
        </div>
    );
}
// checks the or of the applicant, display message accordingly
function GroupOrPEY (props){
    return (props.student.role === "Student")?(
        <Row xs={1} md={2} className="g-4 ms-2 mt-1">
            <div><b>Group :</b> {props.student.group}</div>
            <div><b>Group Name :</b> {props.student.group_name}</div>
        </Row>):(
        <Row xs={1} md={2} className="g-4 ms-2 mt-1">
            <div><b>PEY :</b> {props.student.complete_PEY}</div>
        </Row>
    )
}
// show a list of applicants and enables modal to show detailed information of a selected student
function Applicants(){
    // store the information to show in modal
    const [studentInfo, setInfo] = useState(init_info);
    // show modal when state is true
    const [showModal, setShowModal] = useState(false);
    // close modal and reset student info
    const handleShowModal = ()=>{
        setShowModal(false);
        setInfo(init_info);
    }
    // when clicked, passing the applicant info as argument
    // and display different format according to his/her role
    const handleClick= (student)=>{
        if (student.role === "Student"){
            setInfo(student_info)
        }else{
            setInfo(mentor_info)
        }
    }
    // show modal after student info is updated, and avoid initial render update
    useEffect(()=>{
        if (studentInfo.name){
            setShowModal(true);
        }
    },[studentInfo])
    // a groupt of information will be shown in the same format
    const text_group = {
        program_language: "Program Language",
        frameworks: "Frameworks",
        database: "Databases",
        cloud_platform: "Cloud Platforms"
    }
    // create many example data
    for (let i = 0; i < 5; i++){
        samples[i] = {...student_sample,id:i};
    }
    for (let i = 5; i < 10; i++){
        samples[i] = {...mentor_sample,id:i+5};
    }
    // show specific info in general applicants page for students
    const student_card = (key)=>{
        return ((key === "year") || (key === "group") || (key === "cgpa") || (key === "project_idea"))
    }
    // show specific info in general applicants page for mentors
    const mentor_card = (key)=>{
        return ((key === "year") || (key === "group") || (key === "cgpa") || (key === "PEY"))
    }
    return (
        <Container fluid>
            {/* show all student info in the sample*/}
            <Row xs={1} md={2} className="g-4 ms-2">
                {samples.map((student) => (
                    <Col key={student.id} className={AppModule.card_fit_content}>
                    <Card className={`p-2 h-auto`}>
                        <div className="d-flex">
                            <h4 className="mt-auto mb-auto">{student.name}</h4>
                            <h6 className={`mt-auto ms-2 ${AppModule.role_text_color}`}>{student.role}</h6>
                            <Button variant="secondary" className={`${AppModule.align_end}`} onClick={()=>handleClick(student)}>View</Button>
                        </div>
                        <div className="d-flex row">
                            {student.role === "Student" ? (Object.keys(student).filter(student_card).map((key)=>(
                                <p key={key} className="w-50 ps-3">{key} : {student[key]}</p>
                            )))
                            : (Object.keys(student).filter(mentor_card).map((key)=>(
                                <p key={key} className="w-50 ps-3">{key} : {student[key]}</p>
                            )))}
                        </div>
                    </Card>
                    </Col>
                ))}
            </Row>
            {/* detailed information of a selected applicant shown in modal*/}
            <Modal show={showModal} onHide={handleShowModal} className = "d-flex flex=column " dialogClassName={`${AppModule.dialog_width}` }>
                <Modal.Header closeButton>
                    <Modal.Title>Applicant Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex w-100">
                        <h1 className="ms-2 mt-auto">{studentInfo.name}</h1>
                        <h4 className={`ms-3 mt-auto mb-auto ${AppModule.role_text_color}`}>{studentInfo.role}</h4>
                        <Button variant="primary" className={`${AppModule.resume_button}` }><BsDownload className="mt-auto mb-auto me-1"/>Resume</Button>
                    </div>
                    <hr></hr>
                    <Row xs={1} md={2} className="g-4 ms-2">
                        <div><b>Student # :</b> {studentInfo.student_number}</div>
                        <div><b>Year :</b> {studentInfo.year}</div>
                        <div><b>CGPA :</b> {studentInfo.cgpa}</div>
                        <div><b>Program :</b> {studentInfo.program}</div>
                    </Row>
                    <GroupOrPEY student={studentInfo}/>
                    <Row className="g-4 ms-2 mt-1">
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
                        {(studentInfo.project_idea === "yes")?
                        <div>
                            <div className="mb-2"><b>Project Description</b></div>
                            <div>{studentInfo.project_description}</div>
                        </div>:
                        <div>
                            <div className="mb-2"><b>Past/Current Internship Experience(s)</b></div>
                            <div className="mb-4">{studentInfo.internship_exp}</div>
                            <div className="mb-2"><b>Past/Current Extra-Curricular and/or Leadership Experience(s)</b></div>
                            <div className="mb-4">{studentInfo.extra_curricular}</div>
                            <div className="mb-2"><b>Software Related Projects  Description</b></div>
                            <div className="mb-4">{studentInfo.projects}</div>
                            <div className="mb-2"><b>Project  Links</b></div>
                            <div className="mb-2">{studentInfo.project_link}</div>
                        </div>}
                        <div>
                            <div className="mb-2"><b>Additional Information</b></div>
                            <div>{studentInfo.additional_info}</div>
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary me-auto" onClick={handleShowModal}>
                    Accept
                    </Button>
                    <Button variant="secondary" onClick={handleShowModal}>
                    Reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

function Filter(){
    // initial states for storing filtering values
    const [disablePEY, setDisablePEY] = useState(true);
    const [year,setYear] = useState(null);
    const [checkPEY,setCheckPEY] = useState([false,false]);
    const [databases,addDatabases] = useState([]);
    const [cloudPlat,addCloudPlat] = useState([]);
    // disable PEY section when role is not mentor
    const handleDisablePEY = (e)=>{
        if (e.target.id==='Mentor'){
            setDisablePEY(false);
        }else{
            setDisablePEY(true);
            setCheckPEY([false,false]);
        }
    }
    // add selected database to state and remove when unselected
    const handleDatabase=(e)=>{
        let id;
        id = e.target.id;
        if (databases.includes(id)){
            addDatabases(databases.filter((ele)=>(ele!==id)));
        }
        else{
            addDatabases([...databases,id]);
        }
    }
    // add selected cloud platforms to state and remove when unselected
    const handleCloudPlat=(e)=>{
        let id;
        id = e.target.id;
        if (cloudPlat.includes(id)){
            addCloudPlat(cloudPlat.filter((ele)=>(ele!==id)));
        }
        else{
            addCloudPlat([...cloudPlat,id]);
        }
    }
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
                    <Form.Check label={type} key={type} name="role" type="radio" id={type} onClick={handleDisablePEY}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Year of Study</h5>
            <Form>
                {["All","Second","Third","Fourth"].map((year)=>(
                    <Form.Check label={year} key={year} name="year" type="radio" id={year} onClick={()=>(setYear(year))}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Database</h5>
            <Form>
                {["Any","SQL","NoSQL","Graph"].map((db)=>(
                        <Form.Check label={db} key={db} name="database" type="checkbox" id={db} onClick={handleDatabase}/>
                    ))}
            </Form>
            <hr></hr>
            <h5>Cloud Plat</h5>
            <Form>
                {["Any","Google Cloud","Firebase","Heroku","Netlify","Azure"].map((plat)=>(
                        <Form.Check label={plat} key={plat} name="plateform" type="checkbox" id={plat} onClick={handleCloudPlat}/>
                    ))}
            </Form>
            <hr></hr>
            <Form className="d-flex align-content-center">
                <Form.Control name="cgpa" type="text" id="cgpa" className={AppModule.text_input}/>
                <Form.Label htmlFor="cgpa" className="mt-auto mb-auto ms-2">CGPA</Form.Label>
            </Form>
            <hr></hr>
            <h5>PEY</h5>
            <Form className="d-flex flex-column align-content-center" >
                <div className="form-check">
                    <input className="form-check-input" type="radio" name = "PEY" id = "PEY_yes" checked={checkPEY[0]} disabled = {disablePEY}
                    onClick={()=>(setCheckPEY([true,false]))}/>
                    <label className="form-check-label" htmlFor="PEY_yes">
                    Yes
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name = "PEY" id = "PEY_no" checked={checkPEY[1]} disabled = {disablePEY}
                    onClick={()=>(setCheckPEY([false,true]))}/>
                    <label className="form-check-label" htmlFor="PEY_no">
                    No
                    </label>
                </div>
            </Form>
            <hr></hr>
            <div className="d-flex">
            <Button className={AppModule.align_end}>Apply</Button>
            </div>
        </div>
    );
}