import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { displayWorkoutForm, fetchWorkouts } from '../../redux/databaseSlice';
import Button from 'react-bootstrap/Button';
import ExerciseForm from './ExerciseForm';

const WorkoutForm = () => {

    const dispatch = useDispatch()
    const show = useSelector((state) => state.db.showWorkoutForm)
    const handleClose = () => dispatch(displayWorkoutForm())

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
      //post to Api
        await dispatch(fetchWorkouts()).unwrap()
    };

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
            <hr/>
            List of Sets

            <hr/>
            <h4>Choose Exercise and number of repetitions</h4>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Exercises</Form.Label>
              <Form.Select value= {undefined}
                {...register("exerciseSet")}
              >
                <option value={ExerciseForm.name}>{ExerciseForm.name}</option>
                <option value={"Abs"}>Abs</option>
                <option value={"Biceps"}>Biceps</option>
                <option value={"Chest"}>Chest</option>
                <option value={"Forearms"}>Forearms</option>
                <option value={"Quads"}>Quads</option>
              </Form.Select>
              <Form.Label>Number of repetitions</Form.Label>
              <Form.Control
                   // {...register("type")}
                    type="number"
                    placeholder="Number of repetitions" />
            
            <Button>Add</Button><Button>Clear</Button>
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