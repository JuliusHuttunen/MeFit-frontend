import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ExerciseTable from "./ExerciseTable";
import WorkoutTable from "./WorkoutTable";
import ProgramTable from "./ProgramTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ContributorTabs = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Tabs defaultActiveKey="exercises" className="mb-3">
      <Tab eventKey="exercises" title="Exercises">
        <ExerciseTable />
        <Button variant="dark" onClick={handleShow}>
          Add Exercise
        </Button>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Fill Form and Save
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Tab>
      <Tab eventKey="workouts" title="Workouts">
        <WorkoutTable />
        <Button variant="dark">Add Workout</Button>
      </Tab>
      <Tab eventKey="programs" title="Programs">
        <ProgramTable />
        <Button variant="dark">Add Program</Button>
      </Tab>
    </Tabs>
  );
};

export default ContributorTabs;
