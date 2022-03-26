import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editWorkout, fetchWorkouts } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateWorkoutToAPI } from "../API/Connection";
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const EditWorkoutForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.db.showEditWorkout);
  const workout = useSelector((state) => state.db.currentWorkout);
  const handleClose = (workout) => dispatch(editWorkout(workout));
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

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await updateWorkoutToAPI(data, workout.workoutId);
    await dispatch(fetchWorkouts()).unwrap();
    handleClose(workout);
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
          </Form.Group>
          <h4>Edit exercise sets</h4>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Exercises of set #1</Form.Label>
            <Form.Select value={undefined}
              {...register("exerciseId1")}>
              <option value="">Choose exercise</option>
              {exerciseMap}
            </Form.Select>
            <Form.Label>Number of repetitions</Form.Label>
            <Form.Control
              {...register("exerciseRepetitions1")}
              type="number"
              placeholder="Number of repetitions" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Exercises of set #2</Form.Label>
            <Form.Select value={undefined}
              {...register("exerciseId2")}>
              <option value="">Choose exercise</option>
              {exerciseMap}
            </Form.Select>
            <Form.Label>Number of repetitions</Form.Label>
            <Form.Control
              {...register("exerciseRepetitions2")}
              type="number"
              placeholder="Number of repetitions" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Exercises of set #3</Form.Label>
            <Form.Select value={undefined}
              {...register("exerciseId3")}>
              <option value="">Choose exercise</option>
              {exerciseMap}
            </Form.Select>
            <Form.Label>Number of repetitions</Form.Label>
            <Form.Control
              {...register("exerciseRepetitions3")}
              type="number"
              placeholder="Number of repetitions" />
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
