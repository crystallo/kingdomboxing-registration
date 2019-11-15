import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactUsPage = () => (
    <Container>
        <Row>
            <Col><h1>Contact Us</h1></Col>
        </Row>
        <Row>
            <Col>
                <p><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13443.425059436671!2d-83.69280421330573!3d32.610013749706134!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x82c0b61cbdc38f58!2s619%20Training!5e0!3m2!1sen!2sus!4v1573788684374!5m2!1sen!2sus" 
                width="400" height="350" frameborder="0" allowfullscreen="" /></p>
            </Col>
        </Row>
        <Row>
            <Col md="auto">Address: </Col>
            <Col>114 Constitution Dr Suite 800, Warner Robins, GA 31088 </Col>
        </Row>
        <Row>
            <Col md="auto">Phone: </Col>
            <Col>114 Constitution Dr Suite 800, Warner Robins, GA 31088 </Col>
        </Row>
    </Container>
);

export default ContactUsPage;