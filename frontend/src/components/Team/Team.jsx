import React from 'react';
import { Container } from "react-bootstrap"
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


const Team = () => {
    return (
        <div className='main'>
            <Container>
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
        </div>
    )
};


export default Team;