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
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'

const NUM_DISPLAY = 20;

const platformName = {
    "aws": "AWS",
    "google_cloud": "Google Cloud",
    "firebase" : "Firebase",
    "heroku" : 'Heroku',
    "netlify": "Netlify",
    "azure": "Azure",
    "any" : "Any"
}

const databaseName = {
    "sql": "SQL",
    "nosql": "NoSQL",
    "graph" : "Graph",
    "any" : "Any"
}

const years = {
    "all": "All",
    "third" : "Third",
    "fourth" : "Fourth"
}

const types = {
    "all" : "All",
    "student" : "Student",
    "mentor" : "Mentor"
}
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
    name: '',
    student_number: '',
    ut_email : '',
    cgpa : '',
    program: '',
    year: '',
    resume: '',
    group: '',
    group_name: '',
    program_language: '',
    frameworks: '',
    database: '',
    cloud_platform: '',
    profile_link: '',
    project_idea: '',
    project_description: '',
    additional_info: ''
}

// main container of application page
export default function AdminApplication (){
    const [num_match, setNumMatch] = useState(0)
    const [page_num, setPageNum] = useState(1)
    const handlePageNum = (e)=>{
        if (e.target.id === "page_l"){
            if (page_num-1 > 1){
                setPageNum(page_num-1)
            }
        }else if (e.target.id === "page_r"){
            if (page_num*NUM_DISPLAY < num_match){
                setPageNum(page_num+1)
            }
        }
    }
    useEffect(()=>{

    },[])
    return (
        <div className="d-flex flex-column">
            <Card.Header className="d-flex">
                <div>
                    Application
                </div>
                <div className="ms-auto me-2">
                    {(page_num-1)*NUM_DISPLAY+1 > num_match?num_match:(page_num-1)*NUM_DISPLAY+1} - {page_num*NUM_DISPLAY > num_match?num_match:page_num*NUM_DISPLAY } matches (total {num_match})
                </div>
            </Card.Header>
            <Card.Body className = "d-flex">
                <Filter/>
                <Applicants/>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
                <Form className="d-flex align-content-center">
                    <Button className="me-3 border-0 bg-transparent h-auto text-dark" id = "page_l" onClick={handlePageNum}><FaArrowLeft></FaArrowLeft></Button>
                    <p className = "mt-auto mb-auto">{page_num}</p>
                    <Button className="ms-3 border-0 bg-transparent h-auto text-dark"  id = "page_r" onClick={handlePageNum}><FaArrowRight></FaArrowRight></Button>
                </Form>
            </Card.Footer>
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
    // submit form
    
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

/**
 * {
        'role':'All', this should be deleted in sanitizatioon
        'disablePEY': true, this should not appear
        'year': 2,
        'complete_pey': false
        'databases': {  only has true value
            'sql': false,
            'nosql': false,
            'graph': false,
            'any': true     any must present
        },
        'cloudPlat': { only has true value
            'aws': false,
            'google_cloud':false,
            'firebase':false,
            'heroku': false,
            'netlify':false,
            'azure':false,
            'any':true      any must present
        },
        'cgpa' : float,
        'num_display' : 20,
        'num_page' : int
    }
 */

function Filter(){
    // initial states for storing filtering values
    const init_filter = {
        'role':'all',
        'disablePEY': true,
        'year': 'all',
        'complete_pey': false,
        'databases': {
            'sql': false,
            'nosql': false,
            'graph': false,
            'any': true
        },
        'cloudPlat': {
            'aws': false,
            'google_cloud':false,
            'firebase':false,
            'heroku': false,
            'netlify':false,
            'azure':false,
            'any':true
        },
        'cgpa' : ''
    }
    const [cur_filter,setCurFilter] = useState(
        init_filter
    )
    const [filter,setFilter] = useState(
        init_filter
    )
    const handleClearFilter = (e)=>{
        setFilter(init_filter)
        setCurFilter(init_filter)
    }
    // disable PEY section when role is not mentor
    const handleDisablePEY = (e)=>{
        if (e.target.id==='mentor'){
            setFilter({...filter, 'disablePEY':false,'role':e.target.id});
        }else{
            setFilter({...filter, 'disablePEY':true,'complete_pey':false,'role':e.target.id});
            console.log(filter);
        }
    }
    // add selected database to state and remove when unselected
    const handleDatabase=(e)=>{
        let id;
        id = e.target.id;
        filter['databases'][id] = !filter['databases'][id]
        setFilter({...filter,'databases':filter['databases']})
    }
    // add selected cloud platforms to state and remove when unselected
    const handleCloudPlat=(e)=>{
        let id;
        id = e.target.id;
        filter['cloudPlat'][id] = !filter['cloudPlat'][id]
        setFilter({...filter,'cloudPlat':filter['cloudPlat']})
    }
    // change state of year in filter
    const handleYear=(e)=>{
        setFilter({...filter,'year':e.target.id})
    }
    // chenge state of complete_pey in filter
    const handleCheckPEY=(e)=>{
        setFilter({...filter,'complete_pey':!filter.complete_pey})
    }
    const handleCGPA=(e)=>{
        setFilter({...filter,'cgpa':e.target.value})
    }
    const handleApply=(e)=>{
        setCurFilter(filter)
    }
    return (
        <div className={`d-flex flex-column ${AppModule.filter_container} `}>
            <div className="d-flex justify-content-center">
            <h4>Filter</h4>
            <div className={AppModule.align_end}>
                <Button variant="secondary" onClick={handleClearFilter}> Clear </Button>
            </div>
            </div>
            <hr></hr>
            <h5>Role</h5>
            <Form>
                {["all","student","mentor"].map((type)=>(
                    <Form.Check label={types[type]} key={type} name="role" type="radio" id={type} checked={filter['role'] === type} onChange={handleDisablePEY}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Year of Study</h5>
            <Form>
                {["all","third","fourth"].map((year)=>(
                    <Form.Check label={years[year]} key={year} name="year" type="radio" id={year} checked={filter['year'] === year} onChange={handleYear}/>
                ))}
            </Form>
            <hr></hr>
            <h5>Database</h5>
            <Form>
                {["any","sql","nosql","graph"].map((db)=>(
                        <Form.Check label={databaseName[db]} key={db} name="database" type="checkbox" id={db} checked={filter['databases'][db]} onChange={handleDatabase}/>
                    ))}
            </Form>
            <hr></hr>
            <h5>Cloud Plat</h5>
            <Form>
                {["any","google_cloud","firebase","heroku","netlify","azure"].map((plat)=>(
                        <Form.Check label={platformName[plat]} key={plat} name="plateform" type="checkbox" id={plat} checked={filter['cloudPlat'][plat]} onChange={handleCloudPlat}/>
                    ))}
            </Form>
            <hr></hr>
            <Form className="d-flex align-content-center">
                <Form.Label htmlFor="cgpa" className="mt-auto mb-auto me-2">CGPA {'>='} </Form.Label>
                <Form.Control name="cgpa" type="text" id="cgpa" className={AppModule.text_input} value={filter['cgpa']} onChange={handleCGPA}/>
            </Form>
            <hr></hr>
            <h5>PEY</h5>
            <Form className="d-flex flex-column align-content-center" >
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name = "completePEY" id = "PEY" checked={filter['complete_pey']} disabled = {filter['disablePEY']}
                    onChange={handleCheckPEY}/>
                    <label className="form-check-label" htmlFor="PEY">
                    Complete PEY
                    </label>
                </div>
            </Form>
            <hr></hr>
            <div className="d-flex">
            <Button className={AppModule.align_end} onSubmit={handleApply}>Apply</Button>
            </div>
        </div>
    );
}