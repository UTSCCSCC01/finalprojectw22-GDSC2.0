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
import Axios from "axios";
// import FormGroup from "react-bootstrap/esm/FormGroup";

const MentorForm = () => {
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
  const init_mentor = {
    "student_num": "",
    "email": "",
    "cgpa": 1.8,
    "full_name": "",
    "program": "",
    "year": 2,
    "resume_path": "",
    "complete_pey": false,
    "pey_description": "",
    "experience": "",
    "projects": "",
    "project_path": "",
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
  const [mentor, setMentor] = useState(init_mentor);
  const [databaseEvent, setDatabaseEvent] = useState("");
  const [platEvent, setPlatEvent] = useState("");
  // ];
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

  const handleCheckMentorNum=(e)=>{
    setMentor({...mentor,'student_num':e.target.value});
  }

  // 
  const handleCheckEmail=(e)=>{
    setMentor({...mentor,'email':e.target.value});
  }

  // 
  const handleCheckCGPA=(e)=>{
    setMentor({...mentor,'cgpa':e.target.value});
  }

  // 
  const handleCheckFullName=(e)=>{
    setMentor({...mentor,'full_name':e.target.value});
  }

  // 
  const handleCheckProgram=(e)=>{
    setMentor({...mentor,'program':e.target.value});
  }

  // 
  const handleCheckYear=(e)=>{
    setMentor({...mentor,'year':e.target.value});
  }

  // 
  const handleCheckResume=(e)=>{
    setMentor({...mentor,'resume_path':e.target.value});
  }

  // 
  const handleCheckFrameworks=(e)=>{
    setMentor({...mentor,'frameworks':e.target.value});
  }

  // 
  const handleCheckLanguages=(e)=>{
    setMentor({...mentor,'languages':e.target.value});
  }

  // 
  const handleCheckLinks=(e)=>{
    setMentor({...mentor,'links':e.target.value});
  }

  // 
  const handleCheckDatabases=(e)=>{
    console.log("DATABASE HANDLER TRIGGERED");
    console.log(e);
    console.log(mentor['databases']);
    setDatabaseEvent(e);
  }

  //
  const handleCheckPlat=(e)=>{
    console.log("PLATFORM HANDLER TRIGGERED");
    setPlatEvent(e);
  }

  //
  const handleCheckPEY=(e)=>{
    setMentor({...mentor,'complete_pey':!mentor.complete_pey});
  }

  // 
  const handleCheckPEYDescription=(e)=>{
    setMentor({...mentor,'pey_description':e.target.value});
  }

  //
  const handleCheckExperience=(e)=>{
    setMentor({...mentor,'experience':e.target.value});
  }

  //
  const handleCheckProjects=(e)=>{
    setMentor({...mentor,'projects':e.target.value});
  }

  //
  const handleCheckProjectPath=(e)=>{
    setMentor({...mentor,'project_path':e.target.value});
  }

  //
  const handleCheckAdditional=(e)=>{
    setMentor({...mentor,'additional':e.target.value});
  }

  //Mentor Submit
  const createMentorApplication = (e) => {
    e.preventDefault();
    console.log("SENDING MENTOR APPLICATION");

    //set databases
    for(let i = 0; i < databaseEvent.length; i++){
        if (databaseEvent[i].value !== 'none'){
            mentor['databases']['none'] = false;
            mentor['databases'][databaseEvent[i].value] = !mentor['databases'][databaseEvent[i].value];
        }
        
    }
    
    //set platforms
    for(let i = 0; i < platEvent.length; i++){
        //console.log(platEvent[i].value);
        if (platEvent[i].value !== 'none'){
            mentor['platforms']['none'] = false;
            console.log(platEvent[i].value);
            console.log(mentor['platforms']['pre_select']['aws']);
            mentor['platforms']['pre_select'][platEvent[i].value] = !mentor['platforms']['pre_select'][platEvent[i].value];
        }
    }

    console.log(mentor);
    Axios.post("/applications/mentorSubmit", mentor
    ).then((response) => {
        console.log(response);
    });
    
  }

  return (
    <>
      <h1 className="app-header">Mentor Application</h1>
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
              <Form.Control type="email" placeholder="Full Name" id="mentor" value={mentor['full_name']} onChange={handleCheckFullName}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Student Number
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="Student Number" id="mentor" value={mentor['mentor_num']} onChange={handleCheckMentorNum}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                UofT email Address
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="email" placeholder="UofT email address" id="mentor" value={mentor['email']} onChange={handleCheckEmail}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                CGPA
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="number" placeholder="CGPA" step="0.1" min="1.8" max="4.0" id="mentor" value={mentor['cgpa']} onChange={handleCheckCGPA}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Program of Study
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="text" placeholder="Program of Study" id="mentor" value={mentor['program']} onChange={handleCheckProgram}/>
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
                  id="mentor" 
                  value="2" 
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Third Year"
                  name="formHorizontalRadios1"
                  id="mentor" 
                  value="3"
                  onChange={handleCheckYear}
                />
                <Form.Check
                  type="radio"
                  label="Fourth Year or above"
                  name="formHorizontalRadios1"
                  id="mentor" 
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
              <Form.Control type="file" placeholder="Your answer" id="mentor" value={mentor['resume_path']} onChange={handleCheckResume}/>
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col style={{ textAlign: "center" }} sm={20}>
                <h3>Experience</h3>
              </Col>
              <Form.Label as="legend" column sm={10}>
                Have you completed a PEY term?
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="formHorizontalRadios2"
                  id="mentor" 
                  onChange={handleCheckPEY}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="formHorizontalRadios2"
                  id="mentor" 
                  onChange={handleCheckPEY}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Tell us about your past/current Internship Experience(s)!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['pey_description']} onChange={handleCheckPEYDescription}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Tell us about your past/current Extra-Curricular and/or
                Leadership Experience(s)!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['experience']} onChange={handleCheckExperience}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Tell us about any software related projects you may have!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['projects']} onChange={handleCheckProjects}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Feel free to attach any of your projects here!
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control type="file" multiple placeholder="Your answer" id="mentor" value={mentor['project_path']} onChange={handleCheckProjectPath}/>
            </Col>
          </Form.Group>
        </div>

        <div className="common-form">
          <Form.Group as={Row} className="mb-3">
            <Col style={{ textAlign: "center" }} sm={20}>
              <h3>Technological Experience</h3>
            </Col>
            <Col>
              <Form.Label column sm={10}>
                What programming languages have you worked with
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['languages']} onChange={handleCheckLanguages}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm={10}>
                Which Frameworks have you worked with?
              </Form.Label>
            </Col>
            <Col sm={15}>
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['frameworks']} onChange={handleCheckFrameworks}/>
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
              value={mentor['databases'][db.value]} 
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
              value={mentor['platforms'][plat.value]} 
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
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['links']} onChange={handleCheckLinks}/>
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
              <Form.Control as="textarea" placeholder="Your answer" id="mentor" value={mentor['additional']} onChange={handleCheckAdditional}/>
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
              onClick={createMentorApplication}
            >
              Apply!
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default MentorForm;
