import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editProgram } from "../../redux/databaseSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditProgramForm = () => {

  const dispatch = useDispatch()
  const show = useSelector((state) => state.db.showEditProgram)
  const program = useSelector((state) => state.db.currentProgram)
  const handleClose = (program) => dispatch(editProgram(program))
  const [Program, setProgram] = useState({});

  useEffect(() => {
    setProgram(program)
  },[program])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => { };

  return (
    <Modal show={show} onHide={() => handleClose(Program)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Program name</Form.Label>
            <Form.Control
              {...register("name")}
              value={Program.name}
              type="text"
              onChange={handleChange}
              placeholder="Program name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              {...register("category")}
              value={Program.category}
              type="text"
              onChange={handleChange}
              placeholder="Program category"
            />
          </Form.Group>
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
