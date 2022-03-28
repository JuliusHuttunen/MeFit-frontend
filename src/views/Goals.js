/* Goals view */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import DisplayGoals from "../components/goals/DisplayGoals.js";
import EmptyGoals from "../components/goals/EmptyGoals.js";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Goals = () => {
  const goals = useSelector((state) => state.profile.goals);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (goals.length === 0) {
      handleShow();
    }
  }, []);

  return (
    <Container className="p-3">
      <h2 style={{ textAlign: "center" }}>Goals</h2>
      <hr />
      <Row>
        <Col xs={10}>
          <DisplayGoals enlarge={true}></DisplayGoals>
        </Col>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          style={{ width: "60%" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h1>Goal creation</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark">
            <EmptyGoals></EmptyGoals>
          </Offcanvas.Body>
        </Offcanvas>
        <Col className="pt-4">
          <Row className="mt-3">
            <Button
              style={{ fontSize: "1.2em" }}
              variant="success"
              onClick={handleShow}
            >
              Set more goals
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Goals;
