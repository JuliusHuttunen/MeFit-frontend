import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { getUserProfile, postUserRegister } from "../components/API/Connection";
import { useDispatch } from "react-redux";
import { login, setProfile } from '../redux/utilitySlice';


const Login = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    let { firstname, lastname, email, username, pass } = document.forms[1]
    console.log(firstname.value)
    const userToRegister = {
      "firstname": firstname.value,
      "lastname": lastname.value,
      "email": email.value,
      "username": username.value,
      "pass": pass.value
    }
      
    //USER REGISTER API
    const[error, response] = await postUserRegister(userToRegister)
    console.log("ERR:", error)
    console.log("Response", response)
  }

  return (
    <Container className='w-50 p-3'>
      <h3>Registration form</h3>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          name="firstname"
        ></Form.Control>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="lastname"
        ></Form.Control>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          name="email"
        ></Form.Control>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
        ></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="pass"
        ></Form.Control>
        <Button variant="info" type="submit">Register</Button>
      </Row>
    </Form>
    </Container>
  );
};

export default Login;
