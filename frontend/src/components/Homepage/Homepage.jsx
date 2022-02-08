import React from 'react';
import { Container, Row } from "react-bootstrap";
import dscutm from "../../images/dsc_utm.png";
import "./Homepage.css";


const Homepage = () => {
    return (
        <div className='main'>
            <Container>
                <Row md={1}>
                    <img className='dsclogo' src={dscutm} alt="dsc_utm" />
                    <p className='dsclogo'>Creating impact and <b>empowering students</b> through technology.</p>
                </Row>
            </Container>
        </div>
      
    )
};

export default Homepage;