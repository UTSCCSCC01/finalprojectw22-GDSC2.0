import React, {useState,useEffect}from "react";
import {Button, Form, Col, Modal, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card"
import ProjectModule from "../../css/admin/AdminPastProject.module.css"
import AppModule from "../../css/admin/Application.module.css"

const sample_project = [
    {
        name: "Example Project 0",
        link: "github.com",
        image_path: "some path",
        description: "This is an example project"
    },
    {
        name: "Example Project 1",
        link: "github.com",
        image_path: "some path",
        description: "This is an example project"
    },
    {
        name: "Example Project 2",
        link: "github.com",
        image_path: "some path",
        description: "This is an example project"
    }
]
export default function AdminPastProject(){
    const [projects,setProjects] = useState([])
    const [showFormModal,setShowFromModal] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState({
        "show":false,
        "name": ''
    })
    const [projectForm,setProjectForm] = useState({})

    const handleShowForm =()=>{
        setShowFromModal(false)
    }

    const handleDelete = ()=>{
        // delete
        setShowDeleteModal({...showDeleteModal,"show":false})
    }
    const handleCancel = ()=>{
        // do nothing
        setShowDeleteModal({...showDeleteModal,"show":false})
    }

    useEffect(()=>{
        // initial get request
        setProjects(sample_project)
    },[])
    useEffect(()=>{
        if (projectForm){
            // send request
        }
    },[projectForm])
    return (
    <div>
        <div className="d-flex">
            <Button className ="ms-auto me-3" onClick={()=>setShowFromModal(true)}> Add Project</Button>
        </div>
        <hr></hr>
        {
            projects.map((project)=>(
                <div key={project.name} className='w-auto'>
                    <ProjectCard Project={project} ModalSetter={setShowDeleteModal}/>
                </div>
            ))
        }
        <FormModal Data={{"form":projectForm,"setter":setProjectForm}} Modal={{"state":showFormModal,"setter":handleShowForm}}/>
        <DeleteModal Modal={{"state":showDeleteModal,"setter":{"confirm":handleDelete,"cancel":handleCancel}}}/>
    </div>
    )
}

const DeleteModal = (props)=>{
    return (
        <div>
            <Modal show={props.Modal.state.show} onHide={props.Modal.setter.cancel}>
                <Modal.Body>
                    You want to delete {props.Modal.state.name} project.
                </Modal.Body>
                <Modal.Footer className="p-2">
                    <Button onClick={props.Modal.setter.confirm}> Confirm </Button>
                    <Button variant="danger" className="ms-auto" onClick={props.Modal.setter.cancel}> Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const ProjectCard = (props)=>{
    const [project,setProject] = useState({})
    useEffect(()=>{
        setProject(props.Project)
    },[props.Project])
    return (
        <Card className="d-flex flex-row p-2 m-3 border-dark fit-content">
            <Card.Img variant="top" src='#' className={`${ProjectModule.image_size}`}/>
            <Card.Body className={`d-flex flex-column ${ProjectModule.text_box_width}`}>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text className={`${ProjectModule.text_box_overflow} h-100` }>
                    {project.description}dfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsddfsdfsfsdfsd
                </Card.Text>
            </Card.Body>
            <button type="button" className={`btn btn-xs btn-danger img-circle mt-auto mb-auto ms-auto me-5 ${ProjectModule.button_size}`} id={project.name} onClick={(e)=>props.ModalSetter({"show":true,"name":e.target.id})}>
                &#xff38;
            </button>
        </Card>
    )
}

const FormModal = (props)=>{
    const [formVal,setFormVal] = useState({
        name: '',
        link: '',
        image_path:'',
        desctiption: ''
    })
    const handleSubmit = ()=>{
        props.Data.setter(formVal)
        props.Modal.setter(false)
    }
    return (
        <div>
          <Modal
            show={props.Modal.state}
            onHide={props.Modal.setter}
            className="d-flex flex=column "
            dialogClassName={`${AppModule.dialog_width}`}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Label htmlFor="name" column sm={10}>
                    Name
                  </Form.Label>
                </Col>
                <Col sm={15}>
                  <Form.Control
                    id="name"
                    value={formVal.name}
                    name="section"
                    onChange={(e)=>setFormVal({...formVal,name:e.target.value})}
                    type="text"
                    maxLength="20"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Label htmlFor="link" column sm={10}>
                    Link
                  </Form.Label>
                </Col>
                <Col sm={15}>
                  <Form.Control
                    value={formVal.link}
                    name="link"
                    id="link"
                    onChange={(e)=>setFormVal({...formVal,link:e.target.value})}
                    maxLength="50"
                    type="text"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Label htmlFor="image" column sm={10}>
                    Image
                  </Form.Label>
                </Col>
                <Col sm={15}>
                  <Form.Control
                    value={formVal.image}
                    id="image"
                    name="image"
                    onChange={(e)=>setFormVal({...formVal,image_path:e.target.value})}
                    type="file"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Label htmlFor="description" column sm={10}>
                    Project Description
                  </Form.Label>
                </Col>
                <Col sm={15}>
                  <Form.Control
                    id="description"
                    value={formVal.description}
                    name="description"
                    as="textarea"
                    maxLength="60"
                    onChange={(e)=>setFormVal({...formVal,desctiption:e.target.value})}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <div className="text-center">
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
    )
}