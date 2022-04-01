import React, {useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import {Row, Col, Button, Modal} from "react-bootstrap";
import AppModule from "../../css/admin/Application.module.css";
import axios from 'axios';
import "./StudentTeam.css";

export default function StudentTeam(){
    const params = useParams();
    const team_id = params.team_id;
    const [students,setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [teamInfo,setTeamInfo] = useState({})
    const inputRef = useRef();
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [description,setDescription] = useState("")
    const [desInput,setDesInput] = useState("")

    const [source, setSource] = useState();
    const [sourceModal,setSourceModal] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };
    const handleEdit = ()=>{
        setDescriptionModal(true);
    }
    const handleSubmit = ()=>{
        axios.post('/teams/setDescription',{'id':team_id,'description':desInput})
        .catch((e)=>{
            alert(e);
        })
        axios.post("/teams/getDescription",{'id':team_id})
        .then((res)=>{
            setDescription(res.data.description);
            setDesInput("")
        })
        setDescriptionModal(false);
    }
    const handlePitchUpdate = ()=>{
        setSourceModal(true)
    }
    const handlePitchChange = (e)=>{
        handleFileChange(e);
        setSourceModal(false);
    }
    useEffect(()=>{
        axios.post("/teams/getTeamInfo",{"team_id":team_id}).
        then((res)=>{
            setStudents(res.data.students);
            setMentors(res.data.mentors);
            setTeamInfo({
                name:res.data.team_name,
                description:res.data.description,
                pitch:res.data.description,
            })
            setDescription(res.data.description)
        })
        .catch((e)=>{
            alert(e);
        })
        
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
                    <p className="description_container">{description}</p>
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
                            </div>
                        </div>
                        )
                    }
                    {source && (
                        <div>
                            <h3>Elevator Pitch <Button onClick={handlePitchUpdate}>Update</Button></h3>
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
                                <Col sm={10} className="team_member">{mentor.full_name}</Col>
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
                                <Col sm={10} className="team_member">{student.full_name}</Col>
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
                <textarea cols ="50" rows="8" value={desInput} onChange={(e)=>setDesInput(e.target.value)}></textarea>
                </Modal.Body>
                <Modal.Footer><Button onClick={handleSubmit}>Submit</Button></Modal.Footer>
            </Modal>
            <Modal
                show={sourceModal}
                onHide={() => setSourceModal(false)}
                className="d-flex flex-column "
                dialogClassName={`${AppModule.dialog_width}`}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Upload Elevator Pitch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input
                                ref={inputRef}
                                type="file"
                                onChange={handlePitchChange}
                                accept=".mov,.mp4"
                            />
                </Modal.Body>
            </Modal>
        </div>
    )
}
