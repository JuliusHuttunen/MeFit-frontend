import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { postUserLogin } from "../API/Connection";
import { useDispatch } from "react-redux";
import { login } from '../../redux/utilitySlice';


const LoginForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    let { username, pass } = document.forms[0]
    const user = {
      "username": username.value,
      "password": pass.value
    }
    console.log("Username:", user.username, "Password:", user.password)
    dispatch(login(user))

    //USER LOGIN API
    /*const[error, userInfo] = await postUserLogin(username.value, pass.value)
    console.log("ERR:", error)
    console.log("Response:", userInfo)*/
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
