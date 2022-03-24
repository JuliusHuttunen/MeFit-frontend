import React from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux";

const ExerciseTable = () => {

  const exercises = useSelector((state) => state.db.exercises)

  const exercisesMap = exercises.map((exercise, index) => {
      return(
        <tr key={index}>
          <td>{exercise.exerciseId}</td>
          <td>{exercise.name}</td>
          <td>{exercise.description}</td>
          <td>{exercise.targetMuscleGroup}</td>
          <td>{exercise.fitnessLevel}</td>
          <td><Button>edit</Button></td>
        </tr>
      )
  })
  return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Target Muscle</th>
            <th>Level</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {exercisesMap}
        </tbody>
      </Table>
  );
};

export default ExerciseTable;
