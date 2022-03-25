import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editProgram, fetchPrograms } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateProgramToAPI } from "../API/Connection";

const EditProgramForm = () => {

  const dispatch = useDispatch()
  const show = useSelector((state) => state.db.showEditProgram)
  const program = useSelector((state) => state.db.currentProgram)
  const handleClose = (program) => dispatch(editProgram(program))
  const workouts = useSelector((state) => state.db.workouts)
  const [Program, setProgram] = useState({});

  useEffect(() => {
    setProgram(program)
  }, [program])

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setProgram((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => { 
    await updateProgramToAPI(data, program.programId)
    await dispatch(fetchPrograms()).unwrap()
    handleClose(program)
  };

  const workoutMap = workouts.map((workout, index) => {
    return (
      <option key={index} value={workout.workoutId}>{workout.name}</option>
    )
  })

  return (
    <Modal size="lg" show={show} onHide={() => handleClose(Program)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Program name</Form.Label>
            <Form.Control
              {...register("name")}
              value={Program.name}
              type="text"
              onChange={handleChange}
              placeholder="Enter program name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              {...register("category")}
              value={Program.category}
              type="text"
              onChange={handleChange}
              placeholder="Category of program" />
          </Form.Group>
          <h4>Edit Workouts</h4>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Workout #1</Form.Label>
            <Form.Select
              {...register("workoutId1")}
            >
              <option value="">Choose workout</option>
              {workoutMap}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Workout #2</Form.Label>
            <Form.Select
              {...register("workoutId2")}
            >
              <option value="">Choose workout</option>
              {workoutMap}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Workout #3</Form.Label>
            <Form.Select value={undefined}
              {...register("workoutId3")}
            >
              <option value="">Choose workout</option>
              {workoutMap}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(Program)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProgramForm;
