import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { login, setProfile } from "../../redux/utilitySlice";
import {
  getUserProfile,
  postUserRegister,
  postUserLogin,
} from "../API/Connection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object({
  first_name: yup
    .string()
    .max(20, "Maximum characters 20")
    .required("First name is required"),
  last_name: yup
    .string()
    .max(20, "Maximum characters 20")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Email address must be valid")
    .max(100, "Maximum characters 100")
    .required("Email is required"),
  user_name: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Maximum characters 20")
    .required("Username is required"),
  pass: yup
    .string()
    .max(20, "Maximum characters 20")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Minimum 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    let { first_name, last_name, email, user_name, pass } = document.forms[1];
    const userToRegister = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      user_name: user_name.value,
      pass: pass.value,
    };

    //USER REGISTER API
    const [error, response] = await postUserRegister(userToRegister);
    console.log("ERR:", error);
    console.log("Response", response);

    const [error2, userInfo] = await postUserLogin(user_name.value, pass.value);
    console.log("ERR:", error2);
    if (userInfo !== null) {
      dispatch(login(userInfo));
      const [error, userProfile] = await getUserProfile(userInfo);
      console.log("ERR:", error);
      console.log("Profile", userProfile);
      if (userProfile.height === 0 || userProfile.weight === 0) {
        navigate("profileForm");
      }
      dispatch(setProfile(userProfile));
      navigate("Dashboard");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className>
      <h3>Registration form</h3>
      <Row className="mt-3 mb-1">
        <Col>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("first_name")}
            type="text"
            placeholder="First Name"
            name="first_name"
          ></Form.Control>
          <p>{errors.first_name?.message}</p>
        </Col>
        <Col>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("last_name")}
            type="text"
            placeholder="Last Name"
            name="last_name"
          ></Form.Control>
          <p>{errors.last_name?.message}</p>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
          ></Form.Control>
          <p>{errors.email?.message}</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("user_name")}
            type="text"
            placeholder="Username"
            name="user_name"
          ></Form.Control>
          <p>{errors.user_name?.message}</p>
        </Col>
        <Col>
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("pass")}
            type="password"
            placeholder="Password"
            name="pass"
          ></Form.Control>
          <p>{errors.pass?.message}</p>
        </Col>
      </Row>
      <Row>
        <Button variant="info" type="submit">
          Register
        </Button>
      </Row>
    </Form>
  );
};

export default RegisterForm;
