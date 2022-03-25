import React from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux";
import { editWorkout } from "../../redux/databaseSlice";

const WorkoutTable = () => {

  const workouts = useSelector((state) => state.db.workouts)
  const dispatch = useDispatch()

  const handleOpen = (workout) => dispatch(editWorkout(workout))

  const workoutsMap = workouts.map((workout, index) => {
      return(
        <tr key={index}>
          <td>{workout.workoutId}</td>
          <td>{workout.name}</td>
          <td>{workout.type}</td>
          <td><Button onClick={() => handleOpen(workout)}>edit</Button></td>
        </tr>
      )
  })
  return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {workoutsMap}
        </tbody>
      </Table>
  );
};

export default WorkoutTable;