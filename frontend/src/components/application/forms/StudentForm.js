import { React, useState } from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import InputGroup from "react-bootstrap/InputGroup";
// import Container from "react-bootstrap/Container";
import Multiselect from "multiselect-react-dropdown";
import "./MentorForm.css";
//const {postStudentApplication} = require("../../../axios.js");
import Axios from "axios";
// import { FaEyeDropper } from "react-icons/fa";
// import FormGroup from "react-bootstrap/esm/FormGroup";

const StudentForm = () => {
  const dbOptions = [
    { label: "SQL (PostgreSQL, MySQL etc.)", value: "sql"},
    { label: "noSQL (MongoDB, Firestore, DynamoDB etc.)", value: "nosql"},
    { label: "Graph Databases (Neo4j)", value: "graph"},
    { label: "None", value: "none"},
  ];
  const platOptions = [
    { label: "AWS", value: "aws"},
    { label: "Google cloud Platform", value: "google_cloud"},
    { label: "Firebase", value: "firebase"},
    { label: "Heroku", value: "heroku"},
    { label: "Netlify", value: "netlify"},
    { label: "Azure", value: "azure"},
    { label: "None", value: "none"},
  ];

  const init_student = {
      "student_num": "",
      "email": "",
      "cgpa": 1.8,
      "full_name": "",
      "program": "",
      "year": 2,
      "resume_path": "",
      "frameworks": "",
      "languages": "",
      "databases": {
        "sql": false,
        "nosql": false,
        "graph": false,
        "none": true
      },
      "platforms": {
        "pre_select":{
            'aws': false,
            'google_cloud':false,
            'firebase':false,
            'heroku': false,
            'netlify':false,
            'azure':false,
        },
        'none':true,
        'other':''
      },
      "have_group": false,
      "group_members": "",
      "project_idea": false,
      "idea_description": "",
      "links": "",
      "status": 1,
      "additional": ""
  }

  const [db, setDB] = useState(dbOptions);
  const [plat, setPlat] = useState(platOptions);
  const [student, setStudent] = useState(init_student);
  const [databaseEvent, setDatabaseEvent] = useState("");
  const [platEvent, setPlatEvent] = useState("");
  // 
//   const handleCheckUserId=(e)=>{
//     setStudent({...student,'user_id':e.target.value})
//   }
  // 
  const handleCheckStudentNum=(e)=>{
    setStudent({...student,'student_num':e.target.value});
  }

  // 
  const handleCheckEmail=(e)=>{
    setStudent({...student,'email':e.target.value});
  }

  // 
  const handleCheckCGPA=(e)=>{
    setStudent({...student,'cgpa':e.target.value});
  }

  // 
  const handleCheckFullName=(e)=>{
    setStudent({...student,'full_name':e.target.value});
  }

  // 
  const handleCheckProgram=(e)=>{
    setStudent({...student,'program':e.target.value});
  }

  // 
  const handleCheckYear=(e)=>{
    setStudent({...student,'year':e.target.value});
  }

  // 
  const handleCheckResume=(e)=>{
    setStudent({...student,'resume_path':e.target.value});
  }

  // 
  const handleCheckFrameworks=(e)=>{
    setStudent({...student,'frameworks':e.target.value});
  }

  // 
  const handleCheckLanguages=(e)=>{
    setStudent({...student,'languages':e.target.value});
  }

  // 
  const handleCheckLinks=(e)=>{
    setStudent({...student,'links':e.target.value});
  }

  // 
  const handleCheckDatabases=(e)=>{
    console.log("DATABASE HANDLER TRIGGERED");
    console.log(e);
    console.log(student['databases']);
    setDatabaseEvent(e);
  }

  //
  const handleCheckPlat=(e)=>{
    console.log("PLATFORM HANDLER TRIGGERED");
    setPlatEvent(e);
  }

  //
  const handleCheckGroup=(e)=>{
    setStudent({...student,'have_group':!student.have_group});
  }

  // 
  const handleCheckMembers=(e)=>{
    setStudent({...student,'group_members':e.target.value});
  }

  //
  const handleCheckProject=(e)=>{
    setStudent({...student,'project_idea':!student.project_idea});
  }

  //
  const handleCheckIdea=(e)=>{
    setStudent({...student,'idea_description':e.target.value});
  }

  //
  const handleCheckAdditional=(e)=>{
    setStudent({...student,'additional':e.target.value});
  }


  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      student_num: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  //Student Submit
  const createStudentApplication = (e) => {
    e.preventDefault();
    console.log("SENDING STUDENT APPLICATION");

    //set databases
    for(let i = 0; i < databaseEvent.length; i++){
        if (databaseEvent[i].value !== 'none'){
            student['databases']['none'] = false;
            student['databases'][databaseEvent[i].value] = !student['databases'][databaseEvent[i].value];
        }
        
    }
    
    //set platforms
    for(let i = 0; i < platEvent.length; i++){
        //console.log(platEvent[i].value);
        if (platEvent[i].value !== 'none'){
            student['platforms']['none'] = false;
            console.log(platEvent[i].value);
            console.log(student['platforms']['pre_select']['aws']);
            student['platforms']['pre_select'][platEvent[i].value] = !student['platforms']['pre_select'][platEvent[i].value];
        }
    }

    console.log(student);
    Axios.post("/applications/studentSubmit", student
    ).then((response) => {
        console.log(response);
    });
    
  }

  return (
    <>
      <h1 className="app-header">Student Application</h1>
      <Form className="app-container">
        <div className="common-form">
          <Form.Group as={Row} className="mb-3">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Individual Information</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Full Name
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="text" placeholder="Full Name" id="student" value={student['full_name']} onChange={handleCheckFullName}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Student Number
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="Student Number" id="student" value={student['student_num']} onChange={handleCheckStudentNum}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                UofT email Address
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="email" placeholder="UofT email address" id="student" value={student['email']} onChange={handleCheckEmail}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                CGPA
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="CGPA" id="student" value={student['cgpa']} onChange={handleCheckCGPA}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Program of Study
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="text" placeholder="Program of Study" id="student" value={student['program']} onChange={handleCheckProgram}/>
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={10}>
                What year of study will you be as of Winter 2021
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Second Year"
                  name="formHorizontalRadios1"
                  id="student" 
                  value="2" 
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Third Year"
                  name="formHorizontalRadios1"
                  id="student" 
                  value="3"
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Fourth Year or above"
                  name="formHorizontalRadios1"
                  id="student" 
                  value="4"
                  onChange={handleCheckYear}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Resume
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="file" placeholder="Your answer" id="student" value={student['resume_path']} onChange={handleCheckResume}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={10}>
              Do you have a group of 4 members
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Yes"
                name="formHorizontalRadios2"
                id="student" 
                value={student['have_group']} 
                onChange={handleCheckGroup}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios2"
                id="student" 
                value={student['have_group']} 
                onChange={handleCheckGroup}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Group member names
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['group_members']} onChange={handleCheckMembers}/>
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Technical Knowledge</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                What programming languages have you worked with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['languages']} onChange={handleCheckLanguages}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Which Frameworks have you worked with?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['frameworks']} onChange={handleCheckFrameworks}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                What databases have you used?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Multiselect 
              options={db} 
              displayValue="label" 
              id={db} 
              value={student['databases'][db.value]} 
              onSelect={handleCheckDatabases}
              onRemove={handleCheckDatabases}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                What Platforms are you familiar with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Multiselect 
              options={plat} 
              displayValue="label" 
              id={plat} 
              value={student['platforms'][plat.value]} 
              onSelect={handleCheckPlat}
              onRemove={handleCheckPlat}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Provide us with your Github, Devpost, Portfolio, etc. links
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['links']} onChange={handleCheckLinks}/>
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Project Ideas</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Do you/does your group have a project idea?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Check
                type="radio"
                label="Yes"
                name="formHorizontalRadios3"
                id="student" 
                value={student['project_idea']} 
                onChange={handleCheckProject}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios3"
                id="student" 
                value={student['project_idea']} 
                onChange={handleCheckProject}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                If yes, please describe your idea below
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['idea_description']} onChange={handleCheckIdea}/>
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Additional Information</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                Is there anything else you'd like us to know
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="student" value={student['additional']} onChange={handleCheckAdditional}/>
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 5 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group> */}
        </div>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 5 }}>
            <Button
              className="submit"
              variant="outline-success"
              size="lg"
              type="submit"
              onClick={createStudentApplication}
            >
              Apply!
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default StudentForm;
