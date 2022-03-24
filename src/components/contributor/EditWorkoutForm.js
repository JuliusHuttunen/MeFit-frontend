import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editWorkout } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditWorkoutForm = () => {

  const dispatch = useDispatch()
  const show = useSelector((state) => state.db.showEditWorkout)
  const workout = useSelector((state) => state.db.currentWorkout)
  const handleClose = (workout) => dispatch(editWorkout(workout))
  const [Workout, setWorkout] = useState({});

  useEffect(() => {
    setWorkout(workout)
  },[workout])

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
  } = useForm();
  const onSubmit = async (data) => { };

  return (
    <Modal show={show} onHide={() => handleClose(Workout)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Workout name</Form.Label>
            <Form.Control
              {...register("name")}
              value={Workout.name}
              type="text"
              onChange={handleChange}
              placeholder="Workout name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              {...register("type")}
              value={Workout.type}
              type="text"
              onChange={handleChange}
              placeholder="Workout type"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(Workout)}>
          Cancel
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default EditWorkoutForm;
