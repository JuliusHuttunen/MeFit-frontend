import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { postExerciseToAPI } from '../API/Connection';
import { displayExerciseForm, fetchExercises } from '../../redux/databaseSlice';
import Button from 'react-bootstrap/Button';

const ExerciseForm = () => {

    const dispatch = useDispatch()
    const show = useSelector((state) => state.db.showExerciseForm)
    const handleClose = () => dispatch(displayExerciseForm())

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        await postExerciseToAPI(data)
        await dispatch(fetchExercises()).unwrap()
    };

    return (
        <>
      <Modal show={show} onHide={handleClose}>
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
                    placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMuscleGroup">
              <Form.Label>Target muscle group</Form.Label>
              <Form.Select value= {undefined}
                {...register("targetMuscleGroup")}
              >
                <option value={"Abs"}>Abs</option>
                <option value={"Biceps"}>Biceps</option>
                <option value={"Chest"}>Chest</option>
                <option value={"Forearms"}>Forearms</option>
                <option value={"Quads"}>Quads</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                    {...register("description")}
                    type="text"
                    placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFitnessLevel">
            <Form.Label>Fitness Level</Form.Label>
              <Form.Select value= {undefined}
                {...register("fitnessLevel")}
              >
                <option value={1}>Very Poor</option>
                <option value={2}>Poor</option>
                <option value={3}>Average</option>
                <option value={4}>Good</option>
                <option value={5}>Excellent</option>
              </Form.Select>
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

export default ExerciseForm;