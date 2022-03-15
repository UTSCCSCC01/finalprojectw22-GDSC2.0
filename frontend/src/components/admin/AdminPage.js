import React, {useState,useEffect} from "react";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import dsc_utm from "../../images/dsc_utm.png";
import AdminStyle from "../../css/admin/AdminPage.module.css";
import AdminApplication from "./AdminApplications"
import {Button} from "react-bootstrap"
import axios from "axios"
import AdminPastProject from "./AdminPastProject";

export default function AdminPage(props){
    // reference: https://gdscutm.com
    const [itemKey, setActive] = useState("1");
    const [portalActive,setPortalActive] = useState(true);
    const handleActive = (e) => {
        setActive(e);
    };
    useEffect(()=>{
        axios.get("/getPortalStatus")
        .then((res)=>{
          setPortalActive(res.data.active);
        })
      },[portalActive])
    const activatePortal=(e)=>{
        axios.post("/postPortalStatus",{status:true})
        .then ((res)=>(
            setPortalActive(res.data.active)))
    }
    const deactivatePortal = (e)=>{
        axios.post("/postPortalStatus",{status:false})
        .then ((res)=>(
            setPortalActive(res.data.active)))
    }
    // main frame of admin interface
    // includes nav bar and designated area to show content.
    return (
        <div>
            <div className={AdminStyle.admin_logo_box}>
                <h1>
                    <img src={dsc_utm} alt ="" className = {AdminStyle.admin_logo}></img>
                </h1>
            </div>
            {portalActive?
                <Button variant='secondary' className="ms-5" onClick={deactivatePortal}> Close Portal</Button>:
                <Button variant='primary' className = "ms-5" onClick={activatePortal}> Open Portal</Button>
            }
            <div className="d-flex">
                <Nav variant="tabs" activeKey={itemKey} onSelect={handleActive} className={`flex-column pt-5 ${AdminStyle.admin_nav} ${AdminStyle.nav_tabs}`}>
                    <Nav.Item>
                        <Nav.Link eventKey="1" href="#">
                        Applications
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" href="#">
                        Resources
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="3" href="#">
                        Events
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="4" href="#">
                        Past Projects
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Accordion className={`w-100 ${AdminStyle.info_sec} mb-5`} defaultActiveKey = {itemKey} activeKey = {itemKey}>
                    <Accordion.Collapse eventKey = "1">
                        <Card className={AdminStyle.container_width}>
                            <AdminApplication/>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "2">
                        <Card className={AdminStyle.container_width}>
                            <Card.Header>
                                Resources
                            </Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "3">
                        <Card className={AdminStyle.container_width}>
                            <Card.Header>
                                Events
                            </Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "4">
                        <Card className={AdminStyle.container_width}>
                            <Card.Header>
                                Past Projects
                            </Card.Header>
                            <Card.Body>
                                <AdminPastProject/>
                            </Card.Body>
                        </Card>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        </div>
    );
}
