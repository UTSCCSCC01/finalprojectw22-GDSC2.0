import React from 'react';
import { Container } from "react-bootstrap"
import "./AdminProfiles.css"
import ilir from "../../images/ilir.png"

const AdminProfiles = () => {
    return (
        <div className='main'>
            <Container>
                <h3>Meet the Admins</h3>
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
                       <img className='member' src={ ilir }/> 
                       <p className='text secondary'>
                           <b>
                               Ilir Dema
                           </b>
                           <br />
                           Faculty Advisor
                       </p>
                    </div>
                </div>
            </Container>
        </div>
    )
};


export default AdminProfiles;