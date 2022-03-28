//Workout editor
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { editWorkout, fetchWorkouts } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateWorkoutToAPI } from "../API/Connection";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// yup validation schema
const editWorkoutSchema = yup.object(
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
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null))
      .when("exerciseId1", {
        is: (exerciseId1) => exerciseId1,
        then: yup.number().required(),
      }),
    exerciseId2: yup.string().max(100, "Maximum characters 100"),
    exerciseRepetitions2: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null))
      .when("exerciseId2", {
        is: (exerciseId2) => exerciseId2,
        then: yup.number().required(),
      }),
    exerciseId3: yup.string().max(100, "Maximum characters 100"),
    exerciseRepetitions3: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null))
      .when("exerciseId3", {
        is: (exerciseId3) => exerciseId3,
        then: yup.number().required(),
      }),
  },
  [["exerciseId2", "exerciseId3"]]
);

const EditWorkoutForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.db.showEditWorkout);
  const workout = useSelector((state) => state.db.currentWorkout);
  const handleClose = (workout) => dispatch(editWorkout(workout))
  const exercises = useSelector((state) => state.db.exercises);
  const [Workout, setWorkout] = useState({});

  useEffect(() => {
    setWorkout(workout);
  }, [workout]);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setWorkout((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(editWorkoutSchema) });
  const onSubmit = async (data) => {
    reset()
    data = {
      name: Workout.name,
      type: Workout.type,
      exerciseId1: data.exerciseId1,
      exerciseId2: data.exerciseId2,
      exerciseId3: data.exerciseId3,
      exerciseRepetitions1: data.exerciseRepetitions1,
      exerciseRepetitions2: data.exerciseRepetitions2,
      exerciseRepetitions3: data.exerciseRepetitions3
    }
    await updateWorkoutToAPI(data, workout.workoutId);
    await dispatch(fetchWorkouts()).unwrap();
    handleClose(Workout)
  };

  const exerciseMap = exercises.map((exercise, index) => {
    return (
      <option key={index} value={exercise.exerciseId}>
        {exercise.name}
      </option>
    );
  });

  return (
    <Modal size="lg" show={show} onHide={() => handleClose(Workout)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Workout name</Form.Label>
            <Form.Control
              {...register("name")}
              value={Workout.name}
              type="text"
              onChange={handleChange}
              placeholder="Enter workout name"
            />
            <p>{errors.name?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              {...register("type")}
              value={Workout.type}
              type="text"
              onChange={handleChange}
              placeholder="Type of workout"
            />
            <p>{errors.type?.message}</p>
          </Form.Group>
          <h4>Edit exercise sets</h4>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Exercises of set #1</Form.Label>
            <Form.Select {...register("exerciseId1")}>
              <option value="">Choose a workout</option>
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
            <Form.Select {...register("exerciseId2")}>
              <option value="">Choose a workout</option>
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
            <Form.Select {...register("exerciseId3")}>
              <option value="">Choose a workout</option>
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
            <Button variant="secondary" onClick={() => handleClose(Workout)}>
              Cancel
            </Button>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWorkoutForm;
