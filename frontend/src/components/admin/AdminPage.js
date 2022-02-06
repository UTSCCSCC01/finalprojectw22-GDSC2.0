import React, {useState,} from "react";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import dsc_utm from "../../img/dsc_utm.png"
import AdminStyle from "../../css/admin/AdminPage.module.css";
import AdminApplication from "./AdminApplications"
export default function AdminPage(){
    // reference: https://gdscutm.com
    const [itemKey, setActive] = useState(1);

    const handleActive = (e) => {
        setActive(e);
    };

    
    return (
        <div>
            <div className={AdminStyle.admin_logo_box}>
                <h1>
                    <img src={dsc_utm} alt ="" className = {AdminStyle.admin_logo}></img>
                </h1>
            </div>
            <div className="d-flex">
                <Nav variant="tabs" activeKey={itemKey} onSelect={handleActive} className={`flex-column ${AdminStyle.admin_nav} ${AdminStyle.nav_tabs}`}>
                    <Nav.Item>
                        <Nav.Link eventKey="1" href="#" className={AdminStyle.nav_border}>
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
                <Accordion className={`w-100 ${AdminStyle.info_sec}`} defaultActiveKey = {itemKey} activeKey = {itemKey}>
                    <Accordion.Collapse eventKey = "1">
                        <Card>
                            <Card.Header>
                                Applications
                            </Card.Header>
                            <Card.Body>
                                <AdminApplication/>
                            </Card.Body>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "2">
                        <Card>
                            <Card.Header>
                                Resources
                            </Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "3">
                        <Card>
                            <Card.Header>
                                Events
                            </Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey = "4">
                        <Card>
                            <Card.Header>
                                Past Projects
                            </Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        </div>
    );
}