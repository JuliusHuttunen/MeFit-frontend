import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editExercise, fetchExercises } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateExerciseToAPI } from "../API/Connection";
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const EditExerciseForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.db.showEditExercise);
  const exercise = useSelector((state) => state.db.currentExercise);
  const handleClose = (exercise) => dispatch(editExercise(exercise));
  const [Exercise, setExercise] = useState({})

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setExercise((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setExercise(exercise)
  }, [exercise])

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    reset()
    data = Exercise
    await updateExerciseToAPI(data, exercise.exerciseId);
    await dispatch(fetchExercises()).unwrap();
    handleClose(Exercise)
  };

  return (
    <Modal size="lg" show={show} onHide={() => handleClose(Exercise)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Exercise name</Form.Label>
            <Form.Control
              {...register("name")}
              value={Exercise.name}
              type="text"
              onChange={handleChange}
              placeholder="Name for exercise"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("description")}
              value={Exercise.description}
              type="text"
              onChange={handleChange}
              placeholder="Description of exercise"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="muscleGroup">
            <Form.Label>Target muscle group</Form.Label>
            <Form.Select
              {...register("targetMuscleGroup")}
              value={Exercise.targetMuscleGroup}
              onChange={handleChange}
            >
              <option value={"Abs"}>Abs</option>
              <option value={"Biceps"}>Biceps</option>
              <option value={"Chest"}>Chest</option>
              <option value={"Forearms"}>Forearms</option>
              <option value={"Quads"}>Quads</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fitnessLevel">
            <Form.Label>Level of Exercise</Form.Label>
            <Form.Select
              {...register("fitnessLevel")}
              value={Exercise.fitnessLevel}
              onChange={handleChange}
            >
              <option value={1}>Very Easy</option>
              <option value={2}>Easy</option>
              <option value={3}>Average</option>
              <option value={4}>Hard</option>
              <option value={5}>World Class</option>
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
            <Button variant="secondary" onClick={() => handleClose(Exercise)}>
              Cancel
            </Button>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExerciseForm;
