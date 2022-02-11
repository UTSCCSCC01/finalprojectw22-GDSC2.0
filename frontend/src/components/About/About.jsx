import React from 'react';
import { Container, Col, Row } from "react-bootstrap"
import infosesh from "../../images/infosession.jpg"

const About = () => {
    return (
        <div className='main'>
            <Container>
                <Row className='row'>
                    <Col>
                        <h3>About Us</h3>
                        <div className='lead'>
                            Google Developer Student Clubs (GDSC) is a student-led community backed by Google Developers aimed at empowering undergraduate students from all disciplines to grow their knowledge in technology, build solutions for their local communities, and connect with other members from the Google community.
                        </div> 
                    </Col>
                    <Col>                   
                        <img src={infosesh} alt="dsc_infosesh" />
                    </Col>
                </Row>
                <br />
                <Row className='row'>
                    <h3>Creating impact and empowering students through technology</h3>
                    <div className='lead'>
                        Whether you are new to software development or you've been developing for quite a while, GDSC is a place where you can learn new technologies, make your ideas a reality, and collaborate to solve real-world problems. In addition to solving problems, GDSC will allow you to connect with other technology enthusiasts from other GDSC chapters and the Google Developer Community. We will be hosting events and activities for all students throughout the academic year. We hope to see you there!
                    </div>
                </Row>
            </Container>
        </div>
    )
};

export default About;