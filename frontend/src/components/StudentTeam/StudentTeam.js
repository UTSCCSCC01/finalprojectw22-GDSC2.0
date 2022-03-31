import React, {useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import {Row, Col, Button, Modal} from "react-bootstrap";
import AppModule from "../../css/admin/Application.module.css";
import "./StudentTeam.css";
const sample_students = [
    {
        student_num: "100000000",
        name: "aaa",
        email: "aaa@gmail.com"
    },
    {
        student_num: "100000001",
        name: "bbb",
        email: "bbb@gmail.com"
    },
    {
        student_num: "100000002",
        name: "ccc",
        email: "ccc@gmail.com"
    }
]
const sample_mentors = [
    {
        student_num: "100000003",
        name: "illir",
        email: "illirTheBest@mail.com"
    }
]
const sample_team = {
    name: "GDSC2.0",
    description: "The best university project in Toronto",
    pitch: "What is a pitch"
}
export default function StudentTeam(){
    const params = useParams();
    const team_id = params.team_id;
    const [students,setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [teamInfo,setTeamInfo] = useState({})
    const inputRef = useRef();
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [description,setDescription] = useState("")

    const [source, setSource] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };
    const handleEdit = ()=>{
        setDescriptionModal(true);
    }
    const handleSubmit = ()=>{
        console.log(description);
        setDescriptionModal(false);
    }
    useEffect(()=>{
        // get team info and all members info
        /** 
         * response {
         *  team_name,
         *  description,
         *  pitch,
         *  students: [studentApp]
         *  mentors: [mentorApp]
         * }
         */
        setStudents(sample_students);
        setMentors(sample_mentors);
        setTeamInfo(sample_team);
        
    },[])
    return (
        <div className = "d-flex flex-row bg_new">
            <div className="w-75 p-2">
                <div className="text-center w-100">
                    <h1>{teamInfo.name}</h1>
                </div>
                <hr/>
                <div>
                
                    <h3 className="w-100">Project Description <Button onClick={handleEdit}>Edit</Button></h3>
                    <p className="description_container">{teamInfo.description}</p>
                </div>
                <hr/>
                <div>
                    {
                        !source &&
                        (
                        <div>
                        <h3>Elevator Pitch</h3>
                            <div className="text-center">
                            <input
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                                accept=".mov,.mp4"
                            />
                            <Button>Submit</Button>
                            </div>
                        </div>
                        )
                    }
                    {source && (
                        <div>
                            <h3>Elevator Pitch <Button>Update</Button></h3>
                            <div className="text-center">
                            <video
                            controls
                            src={source}
                            className = "video ms-auto me-auto"
                            />
                            </div>
                        </div>
                    )}
             </div>
            </div>
            <div className="member_border p-3 pl-5 h-100 member_container w-25">
                <h2 className="text-center">Team Members</h2>
                <hr/>
                <h4>Mentor</h4>
                <div>
                {
                    mentors.map((mentor)=>(
                        <div key={mentor.student_num} className="pb-2">
                            <Row>
                                <Col sm={2}>Name:</Col>
                                <Col sm={10} className="team_member">{mentor.name}</Col>
                            </Row>
                            <Row>
                                <Col sm={2}>Email:</Col>
                                <Col sm={10} className="team_member">{mentor.email}</Col>
                            </Row>
                        </div>
                    ))
                }
                </div>
                <hr/>
                <h4>Members</h4>
                <div>
                {
                    students.map((student)=>(
                        <div key={student.student_num} className="pb-2">
                            <Row>
                                <Col sm={2}>Name:</Col>
                                <Col sm={10} className="team_member">{student.name}</Col>
                            </Row>
                            <Row>
                                <Col sm={2}>Email:</Col>
                                <Col sm={10} className="team_member">{student.email}</Col>
                            </Row>
                        </div>
                    ))
                }
                </div>

        </div>
            <Modal
                show={descriptionModal}
                onHide={() => setDescriptionModal(false)}
                className="d-flex flex-column "
                dialogClassName={`${AppModule.dialog_width}`}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Project Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <textarea cols ="50" rows="8" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </Modal.Body>
                <Modal.Footer><Button onClick={handleSubmit}>Submit</Button></Modal.Footer>
            </Modal>
        </div>
    )
}
