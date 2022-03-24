import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { displayProgramForm, fetchPrograms } from '../../redux/databaseSlice';
import Button from 'react-bootstrap/Button';
import { postProgramToAPI } from '../API/Connection';

const ProgramForm = () => {

    const dispatch = useDispatch()
    const show = useSelector((state) => state.db.showProgramForm)
    const handleClose = () => dispatch(displayProgramForm())
    const workouts = useSelector((state) => state.db.workouts)

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        await postProgramToAPI(data)
        await dispatch(fetchPrograms()).unwrap()
        handleClose()
    };

    const workoutMap = workouts.map((workout, index) => {
      return(
        <option key={index} value={workout.workoutId}>{workout.name}</option>
      )
    })

  
    return (
        <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Enter name of the Program</Form.Label>
              <Form.Control
                    {...register("name")}
                    type="text"
                    placeholder="Enter program name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                    {...register("category")}
                    type="text"
                    placeholder="Category of program" />
            </Form.Group>
            <h4>Choose Workouts</h4>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Wourkout #1</Form.Label>
              <Form.Select value= {undefined}
               {...register("workoutId1")}
              >
                <option value="">Empty</option>
                {workoutMap}
              </Form.Select>
  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Wourkout #2</Form.Label>
              <Form.Select value= {undefined}
                {...register("workoutId2")}
              >
                <option value="">Empty</option>
                {workoutMap}
              </Form.Select>
  
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Wourkout #3</Form.Label>
              <Form.Select value= {undefined}
                {...register("workoutId3")}
              >
                <option value="">Empty</option>
                {workoutMap}
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

export default ProgramForm;