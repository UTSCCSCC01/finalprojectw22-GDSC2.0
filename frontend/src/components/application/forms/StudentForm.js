import { React, useState } from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Multiselect from "multiselect-react-dropdown";
import "./MentorForm.css";
//const {postStudentApplication} = require("../../../axios.js");
import Axios from "axios";
// import FormGroup from "react-bootstrap/esm/FormGroup";

const StudentForm = () => {
  const dbOptions = [
    { value: "SQL (PostgreSQL, MySQL etc.)" },
    { value: "noSQL (MongoDB, Firestore, DynamoDB etc.)" },
    { value: "Graph Databases (Neo4j)" },
    { value: "None" },
  ];
  const platOptions = [
    { value: "AWS" },
    { value: "Google cloud Platform" },
    { value: "Firebase" },
    { value: "Heroku" },
    { value: "Netlify" },
    { value: "Azure" },
    { value: "None" },
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
        "any": true
      },
      "platforms": {
      'aws': false,
      'google_cloud':false,
      'firebase':false,
      'heroku': false,
      'netlify':false,
      'azure':false,
      'any':true
      },
      "have_group": false,
      "group_members": "",
      "project_idea": false,
      "idea_description": "",
      "additional": ""
  }

  const [db, setDB] = useState(dbOptions);
  const [plat, setPlat] = useState(platOptions);
  const [student, setStudent] = useState(init_student);

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
  const handleCheckDatabases=(e)=>{
    let id = e.target.id;
    student['databases'][id] = !student['databases'][id];
    setStudent({...student,'databases':student['databases']});
  }

  //
  const handleCheckPlat=(e)=>{
    let id = e.target.id;
    student['platforms'][id] = !student['platforms'][id];
    setStudent({...student,'platforms':student['platforms']});
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

  // ];
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

  //http://localhost:5000
  const createStudentApplication = (e) => {
    console.log("SENDING STUDENT APPLICATION");
    console.log(student);
    Axios.post("/applications/studentSubmit", student
    ).then((response) => {
        console.log(response);
    });
    e.preventDefault();
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
                  name="formHorizontalRadios"
                  id="student" 
                  value="2" 
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Third Year"
                  name="formHorizontalRadios"
                  id="student" 
                  value="3"
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Fourth Year or above"
                  name="formHorizontalRadios"
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
                name="formHorizontalRadios"
                id="student" 
                value={student['have_group']} 
                onChange={handleCheckGroup}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
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
              <Multiselect options={db} displayValue="value" id="student" value={student['databases']} onChange={handleCheckDatabases}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                What Platforms are you familiar with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Multiselect options={plat} displayValue="value" id="student" value={student['platforms']} onChange={handleCheckPlat}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Provide us with your Github, Devpost, Portfolio, etc. links
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" />
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
                name="formHorizontalRadios"
                id="student" 
                value={student['project_idea']} 
                onChange={handleCheckProject}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
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
