import React, {useContext} from 'react';
import { Container, Col, Row } from "react-bootstrap"
import infosesh from "../../images/infosession.jpg"
import DarkModeContext from "../../context/darkMode/DarkModeContext"
import "./Team.css"
import ilir from "../../images/ilir.png"
import akshit from "../../images/Akshit.png"
import chris from "../../images/Chris.png"
import daniel from "../../images/Daniel.png"
import hammad from "../../images/Hammad.png"
import hamza from "../../images/Hamza.png"
import judy from "../../images/Judy.png"
import lance from "../../images/Lance.png"
import lena from "../../images/Lena.png"
import milind from "../../images/Milind.png"
import nitish from "../../images/Nitish.png"
import nivy from "../../images/Nivy.png"
import shahmeer from "../../images/Shahmeer.png"
import shubh from "../../images/Shubh.png"



const About = () => {
    const {mode, toggleMode} = useContext(DarkModeContext)
    return (
        <div className={mode === true ? "main dark" : "main"}>
            <Col>
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
                <Container>
                    <br />
                    <br />
                    <br />
                    <h3>Meet the Team</h3>
                    <br />
                    <br />
                    <div className='team'>
                        <div className='members'>
                        <img className='member' src={ ilir }/> 
                        <p className='text secondary'>
                            <b>
                                Ilir Dema
                            </b>
                            <br />
                            Faculty Advisor
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ akshit }/> 
                        <p className='text secondary'>
                            <b>
                                Akshit Goyal
                            </b>
                            <br />
                            Co-President
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ nivy }/> 
                        <p className='text secondary'>
                            <b>
                                Niveditha Kani
                            </b>
                            <br />
                            Co-President
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ shahmeer }/> 
                        <p className='text secondary'>
                            <b>
                                Shahmeer Shahid
                            </b>
                            <br />
                            Advisor
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ shubh }/> 
                        <p className='text secondary'>
                            <b>
                                Shubh Bapna
                            </b>
                            <br />
                            Community Projects Lead
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ chris }/> 
                        <p className='text secondary'>
                            <b>
                                Chris Lim
                            </b>
                            <br />
                            Community Projects Lead
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ daniel }/> 
                        <p className='text secondary'>
                            <b>
                                Daniel Laufer
                            </b>
                            <br />
                            Workshop Lead
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ milind }/> 
                        <p className='text secondary'>
                            <b>
                                Milind Vishnoi
                            </b>
                            <br />
                            Workshop Lead
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ judy }/> 
                        <p className='text secondary'>
                            <b>
                                Judy Hsu
                            </b>
                            <br />
                            Internal Coordinator
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ hammad }/> 
                        <p className='text secondary'>
                            <b>
                                    Hammad Iqbal
                            </b>
                            <br />
                            Internal Coordinator
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ hamza }/> 
                        <p className='text secondary'>
                            <b>
                                    Muhammad Hamza Gondal
                            </b>
                            <br />
                            External Coordinator
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ nitish }/> 
                        <p className='text secondary'>
                            <b>
                                    Nitish Madabusi
                            </b>
                            <br />
                            External Coordinator
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ lena }/> 
                        <p className='text secondary'>
                            <b>
                                    Lena Mohammad
                            </b>
                            <br />
                            Marketing Lead
                        </p>
                        </div>
                        <div className='members'>
                        <img className='member' src={ lance }/> 
                        <p className='text secondary'>
                            <b>
                                    Lance Cabance
                            </b>
                            <br />
                            Marketing Lead
                        </p>
                        </div>
                    </div>
                </Container>
                <br />
                <br />
                <br />
            </Col>
        </div>
    )
};

export default About;