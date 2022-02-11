import React from 'react';
import { Container, Col, Row, Button } from "react-bootstrap"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

const ContactUs = () => {
  return (
      <div className='main'>
          <Container>
              <Row>
              <h3>Contact Us</h3>
                <Col>
                    <ul>
                    <h4 className='lead'>Follow us on social media!</h4>
                    <br />
                      <Button type="submit" variant='primary' href='https://www.facebook.com/utmdsc'>
                        <FaFacebook /> @utmdsc
                      </Button>
                      <br />
                      <br />
                      <Button type="submit" variant='info' href='https://twitter.com/dscutm/'>
                        <FaTwitter /> @dscutm
                      </Button>
                      <br />
                      <br />
                      <Button type="submit" variant='dark' href='https://www.instagram.com/dscutm/'>
                        <FaInstagram /> @dscutm
                      </Button>
                      <br />
                      <br />
                      <Button type="submit" variant='light' href='mailto:team@dscutm.com'>
                        <AiOutlineMail /> team@dscutm.com
                      </Button>
                    </ul>
                </Col>
                <Col>
                [Map Goes Here]
                </Col>
              </Row>
          </Container>
      </div>
  )
};


export default ContactUs;