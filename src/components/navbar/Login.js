import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Login = () => {
  return (
    
      
        <Row >
          <Col sm="3">
            <Form.Control type="text" placeholder="Username"></Form.Control>
          </Col>
          <Col sm="3" >
            <Form.Control type="password" placeholder="Password"></Form.Control>
          </Col>
          <Col sm="3" className="d-grid">
            <Button variant="warning">Login</Button>
          </Col>
          <Col sm="3" className="d-grid">
            <Button variant="danger">Register</Button>
          </Col>
        </Row>
      
    
  );
};

export default Login;
