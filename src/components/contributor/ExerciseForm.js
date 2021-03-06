//Exercise creation form
import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { postExerciseToAPI } from "../API/Connection";
import { displayExerciseForm, fetchExercises } from "../../redux/databaseSlice";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fetchProfile } from '../../redux/profileSlice'

// yup validation schema
const schema = yup.object({
  name: yup
    .string()
    .max(100, "Maximum characters 100")
    .required("Exercise name is required"),
  description: yup
    .string()
    .max(200, "Maximum characters 100")
    .required("Exercise description is required"),
  targetMuscleGroup: yup
    .string()
    .max(100, "Maximum characters 100")
    .required("Target muscle group is required"),
  fitnessLevel: yup.number().required("Exercise level is required"),
});

const ExerciseForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.db.showExerciseForm);
  const handleClose = () => dispatch(displayExerciseForm());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await postExerciseToAPI(data)
    await dispatch(fetchExercises()).unwrap()
    await dispatch(fetchProfile()).unwrap()
    handleClose()
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter name"
              />
              <p>{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMuscleGroup">
              <Form.Label>Target muscle group</Form.Label>
              <Form.Select value={undefined} {...register("targetMuscleGroup")}>
                <option value={"Abs"}>Abs</option>
                <option value={"Biceps"}>Biceps</option>
                <option value={"Chest"}>Chest</option>
                <option value={"Forearms"}>Forearms</option>
                <option value={"Quads"}>Quads</option>
              </Form.Select>
              <p>{errors.targetMuscleGroup?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                {...register("description")}
                type="text"
                placeholder="Description"
              />
              <p>{errors.description?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFitnessLevel">
              <Form.Label>Level of Exercise</Form.Label>
              <Form.Select value={undefined} {...register("fitnessLevel")}>
                <option value={1}>Very Easy</option>
                <option value={2}>Easy</option>
                <option value={3}>Average</option>
                <option value={4}>Hard</option>
                <option value={5}>World Class</option>
              </Form.Select>
              <p>{errors.fitnessLevel?.message}</p>
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

export default ExerciseForm;
