import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editExercise } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditExerciseForm = () => {

  const dispatch = useDispatch()
  const show = useSelector((state) => state.db.showEditExercise)
  const exercise = useSelector((state) => state.db.currentExercise)
  const handleClose = (exercise) => dispatch(editExercise(exercise))
  const [Exercise, setExercise] = useState({});

  useEffect(() => {
    setExercise(exercise)
  },[exercise])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => { };

  return (
    <Modal show={show} onHide={() => handleClose(Exercise)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          <Form.Group controlId="fitnessLevel">
            <Form.Select
              {...register("fitnessLevel")}
              value={Exercise.fitnessLevel}
              onChange={handleChange}
            >
              <option value={1}>Very Poor</option>
              <option value={2}>Poor</option>
              <option value={3}>Average</option>
              <option value={4}>Good</option>
              <option value={5}>Excellent</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(Exercise)}>
          Cancel
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default EditExerciseForm;
