import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm="3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
          ></Form.Control>
        </Col>
        <Col sm="3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="pass"
          ></Form.Control>
        </Col>
        <Col sm="3" className="d-grid">
          <Button type="submit" variant="secondary">Login</Button>
        </Col>
        <Col sm="3" className="d-grid">
          <Button variant="info">Register</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
