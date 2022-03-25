import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import WorkoutsList from "../components/programviews/WorkoutsList";
import { useSelector } from "react-redux";
import Workout from "../components/templates/Workout";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Workouts = () => {
  const [workoutList, setWorkoutList] = useState(<WorkoutsList />);
  const workouts = useSelector((state) => state.db.workouts);
  const [types, setTypes] = useState([]);

  //Generate types
  useEffect(() => {
    const generateFilters = () => {
      for (let wo of workouts) {
        if (!types.includes(wo.type)) {
          setTypes([...types, wo.type]);
        }
      }
    };
    generateFilters();
  }, [workouts, types]);

  const filterList = (type) => {
    setWorkoutList(
      workouts.map((workout, index) => {
        if (workout.type === type || type === null) {
          return (
            <Workout key={index} workout={workout} index={index}></Workout>
          );
        }
        return <></>;
      })
    );
  };

  const filters = types.map((type, index) => {
    return (
      <Button
        variant="outline-dark"
        className="p-3 m-3"
        key={index}
        onClick={() => filterList(type)}
      >
        <h5>{type}</h5>
      </Button>
    );
  });

  return (
    <div className="cardcontainer">
      <h2>Workouts</h2>
      {workouts === null || workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                className="p-3 m-3"
                onClick={() => filterList(null)}
              >
                <h5>All</h5>
              </Button>
              {filters}
            </Col>
          </Row>
        </Container>
      )}
      <Container className="'p-3 mb-5'">
        <div className="accordiongrid">{workoutList}</div>
      </Container>
    </div>
  );
};

export default Workouts;
