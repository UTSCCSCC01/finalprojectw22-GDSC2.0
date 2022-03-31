import React, {useContext} from 'react';
import { Container, Row } from "react-bootstrap";
import dscutm from "../../images/dsc_utm.png";
import "./Homepage.css";
import DarkModeContext from "../../context/darkMode/DarkModeContext"


const Homepage = () => {
    const {mode, toggleMode} = useContext(DarkModeContext)
    return (
        <div className={mode === true ? "main dark" : "main"}>
            <Container className="mt-auto mb-auto">
                <Row md={1}>
                    <img className='dsclogo' src={dscutm} alt="dsc_utm" />
                    <p className='dsclogo'>Creating impact and <b>empowering students</b> through technology.</p>
                </Row>
            </Container>
        </div>
      
    )
};

export default Homepage;