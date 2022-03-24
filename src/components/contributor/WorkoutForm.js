import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { displayWorkoutForm, fetchWorkouts } from '../../redux/databaseSlice';
import Button from 'react-bootstrap/Button';
import { postWorkoutToAPI } from '../API/Connection';

const WorkoutForm = () => {

    const dispatch = useDispatch()
    const show = useSelector((state) => state.db.showWorkoutForm)
    const handleClose = () => dispatch(displayWorkoutForm())
    const exercises = useSelector((state) => state.db.exercises)

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
      const[error, response] = await postWorkoutToAPI(data)
      console.log(error)
      console.log(response)
      await dispatch(fetchWorkouts()).unwrap()
      handleClose()
    };

    const exerciseMap = exercises.map((exercise, index) => {
      return(
        <option key={index} value={exercise.exerciseId}>{exercise.name}</option>
      )
    })

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
                    placeholder="Enter name of workout" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                    {...register("type")}
                    type="text"
                    placeholder="Type of workout" />
            </Form.Group>
            <h4>Choose Exercise and number of repetitions</h4>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Exercises of set #1</Form.Label>
              <Form.Select value= {undefined}
                {...register("exerciseId1")}>
                <option value="">Empty</option>
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
              <Form.Select value= {undefined}
                {...register("exerciseId2")}>
                <option value="">Empty</option>
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
              <Form.Select value= {undefined}
                {...register("exerciseId3")}>
                <option value="">Empty</option>
                {exerciseMap}
              </Form.Select>
              <Form.Label>Number of repetitions</Form.Label>
              <Form.Control
                    {...register("exerciseRepetitions3")}
                    type="number"
                    placeholder="Number of repetitions" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default WorkoutForm;