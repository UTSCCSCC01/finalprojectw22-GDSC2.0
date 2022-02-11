import React, {useState} from "react";
import LoginStyle from "../../css/admin/AdminLogin.module.css";
import dsc_utm from "../../images/dsc_utm.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import banner from "../../images/banner.png";
export default function AdminLogin(){
    // reference: https://gdscutm.com/
    const [loginInfo,setLoginInfo] = useState(
        {
            AdminId: null,
            Password: null
        }
    )
    const submitButton=()=>{
        console.log(loginInfo);
    }
    // background styles
    const styles = {
        container: {
            backgroundImage: `url(${banner})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }
    };
    return (
        <div className={`d-flex flex-column ${LoginStyle.background_container}`} style={styles.container}>
            <div className={LoginStyle.admin_logo_box}>
                <h1>
                    <img src={dsc_utm} alt ="" className = {LoginStyle.admin_logo}></img>
                </h1>
            </div>
            <div className="align-self-center">
                <Form className="d-flex flex-column" method="Post">
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="10">
                        <Form.Control type="text" placeholder="Adminitrator ID" onChange = {e=>setLoginInfo({AdminId:e.target.value,Password:loginInfo.Password})}className={LoginStyle.input_box_length}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm="10">
                        <Form.Control type="password" placeholder="Password" onChange = {e=>setLoginInfo({Password:e.target.value,AdminId:loginInfo.AdminId})}className={LoginStyle.input_box_length}/>
                        </Col>
                    </Form.Group>
                    <Button action="submit" className="align-self-center mt-3" onClick={submitButton}>Sign In</Button>
                </Form>
            </div>
        </div>
    );
}