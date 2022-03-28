import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { displayWorkoutForm, fetchWorkouts } from "../../redux/databaseSlice";
import Button from "react-bootstrap/Button";
import { postWorkoutToAPI } from "../API/Connection";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// yup validation schema
const schema = yup.object(
  {
    name: yup
      .string()
      .max(100, "Maximum characters 100")
      .required("Workout name is required"),
    type: yup
      .string()
      .max(200, "Maximum characters 100")
      .required("Workout type is required"),
    exerciseId1: yup
      .string()
      .max(100, "Maximum characters 100")
      .when(["exerciseId2", "exerciseId3"], {
        is: (exerciseId2, exerciseId3) => !exerciseId2 && !exerciseId3,
        then: yup.string().max(100, "Maximum characters 100").required(),
      }),
    exerciseRepetitions1: yup
      .number().transform((_, val) => (val ? Number(val) : null)).when("exerciseId1", {
        is: (exerciseId1) => exerciseId1,
        then: yup.number().required()
      }),

    exerciseId2: yup.string().max(100, "Maximum characters 100"),
    exerciseRepetitions2: yup
      .number()
      .transform((_, val) => (val ? Number(val) : null)).when("exerciseId2", {
        is: (exerciseId2) => exerciseId2,
        then: yup.number().required()
      }),

    exerciseId3: yup.string().max(100, "Maximum characters 100"),
    exerciseRepetitions3: yup
      .number()
      .transform((_, val) => (val ? Number(val) : null)).when("exerciseId3", {
        is: (exerciseId3) => exerciseId3,
        then: yup.number().required()
      }),
  },
  [["exerciseId2", "exerciseId3"]]
);

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.db.showWorkoutForm);
  const handleClose = () => dispatch(displayWorkoutForm());
  const exercises = useSelector((state) => state.db.exercises);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const [error, response] = await postWorkoutToAPI(data);
    console.log(error);
    console.log(response);
    await dispatch(fetchWorkouts()).unwrap();
    handleClose();
  };

  const exerciseMap = exercises.map((exercise, index) => {
    return (
      <option key={index} value={exercise.exerciseId}>
        {exercise.name}
      </option>
    );
  });

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter name of workout"
              />
              <p>{errors.name?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                {...register("type")}
                type="text"
                placeholder="Type of workout"
              />
              <p>{errors.type?.message}</p>
            </Form.Group>
            <h4>Choose Exercise and number of repetitions</h4>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Exercises of set #1</Form.Label>
              <Form.Select value={undefined} {...register("exerciseId1")}>
                <option value="">Choose exercise</option>
                {exerciseMap}
              </Form.Select>
              <Form.Label>Number of repetitions</Form.Label>
              <Form.Control
                {...register("exerciseRepetitions1")}
                type="number"
                placeholder="Number of repetitions"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Exercises of set #2</Form.Label>
              <Form.Select value={undefined} {...register("exerciseId2")}>
                <option value="">Choose exercise</option>
                {exerciseMap}
              </Form.Select>
              <Form.Label>Number of repetitions</Form.Label>
              <Form.Control
                {...register("exerciseRepetitions2")}
                type="number"
                placeholder="Number of repetitions"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Exercises of set #3</Form.Label>
              <Form.Select value={undefined} {...register("exerciseId3")}>
                <option value="">Choose exercise</option>
                {exerciseMap}
              </Form.Select>
              <Form.Label>Number of repetitions</Form.Label>
              <Form.Control
                {...register("exerciseRepetitions3")}
                type="number"
                placeholder="Number of repetitions"
              />
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

export default WorkoutForm;
