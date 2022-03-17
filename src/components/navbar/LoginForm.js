import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { login, setProfile } from '../../redux/utilitySlice';
import { useNavigate } from "react-router-dom";
import KeycloakService from "../../KeycloakService";


const LoginForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* const handleSubmit = async (event) => {
    event.preventDefault()
    let { username, pass } = document.forms[0]
      
    //USER LOGIN API
    const[error, userInfo] = await postUserLogin(username.value, pass.value)
    console.log("ERR:", error)
    if(userInfo !== null){ 
      dispatch(login(userInfo))
      const[error, userProfile] = await getUserProfile(userInfo)
      console.log("ERR:", error)
      console.log("Profile", userProfile)
      if(userProfile.height === 0 || userProfile.weight === 0){
        navigate("profileForm")
      }
      else {
        dispatch(setProfile(userProfile))
        navigate("Dashboard")}
    }
  } */

  return (
    <Form>
      <Row>
        {/* <Col sm="3">
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
        </Col> */}
        <Col sm="3" className="d-grid">
          <Button type="button" variant="secondary" onClick={KeycloakService.Login}>Login</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
