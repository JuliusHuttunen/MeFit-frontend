//Program creation form
import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { displayProgramForm, fetchPrograms } from "../../redux/databaseSlice";
import Button from "react-bootstrap/Button";
import { postProgramToAPI } from "../API/Connection";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fetchProfile } from '../../redux/profileSlice'

// yup validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .max(100, "Maximum characters 100")
      .required("Program name is required"),
    category: yup
      .string()
      .max(200, "Maximum characters 100")
      .required("Program category is required"),
    workoutId1: yup.string().max(100, "Maximum characters 100"),
    workoutId2: yup.string().max(100, "Maximum characters 100"),
    workoutId3: yup.string().max(100, "Maximum characters 100"),
  })
  .test(
    "at-least-one-workout",
    "At least one workout is required",
    (value) => !!(value.workoutId1 || value.workoutId2 || value.workoutId3)
  );

const ProgramForm = () => {
  const show = useSelector((state) => state.db.showProgramForm)
  const handleClose = () => dispatch(displayProgramForm())
  const workouts = useSelector((state) => state.db.workouts)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await postProgramToAPI(data)
    await dispatch(fetchPrograms()).unwrap()
    await dispatch(fetchProfile()).unwrap()
    handleClose()
  };

  const workoutMap = workouts.map((workout, index) => {
    return (
      <option key={index} value={workout.workoutId}>{workout.name}</option>
    )
  })
  const dispatch = useDispatch()

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Enter name of the Program</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter program name"
              />
              <p>{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                {...register("category")}
                type="text"
                placeholder="Category of program"
              />
              <p>{errors.category?.message}</p>
            </Form.Group>
            <h4>Choose Workouts</h4>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Workout #1</Form.Label>
              <Form.Select value={undefined} {...register("workoutId1")}>
                <option value="">Empty</option>
                {workoutMap}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Workout #2</Form.Label>
              <Form.Select value={undefined} {...register("workoutId2")}>
                <option value="">Empty</option>
                {workoutMap}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Workout #3</Form.Label>
              <Form.Select value={undefined} {...register("workoutId3")}>
                <option value="">Empty</option>
                {workoutMap}
              </Form.Select>
            </Form.Group>
            <Container fluid>
              <Row style={{ padding: "10px" }}>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container fluid>
            <Row style={{ padding: "10px" }}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProgramForm;
