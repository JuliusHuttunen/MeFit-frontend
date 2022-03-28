import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux";
import { editExercise } from "../../redux/databaseSlice";

const ExerciseTable = () => {

  const exercises = useSelector((state) => state.db.exercises)
  const dispatch = useDispatch()
  const userExercises = useSelector((state) => state.profile.exercises)
  const [userExercisesList, setUserExercisesList] = useState([])

  useEffect(() => {
    try {
      for (let exercise of userExercises) {
        setUserExercisesList(userExercisesList => [...userExercisesList, exercise.exerciseId])
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }, [userExercisesList])

  const handleOpen = (exercise) => dispatch(editExercise(exercise))

  const exercisesMap = exercises.map((exercise, index) => {
    if (userExercisesList.includes(exercise.exerciseId)) {
      return (
        <tr key={index}>
          <td>{exercise.exerciseId}</td>
          <td>{exercise.name}</td>
          <td>{exercise.description}</td>
          <td>{exercise.targetMuscleGroup}</td>
          <td>{exercise.fitnessLevel}</td>
          <td><Button onClick={() => handleOpen(exercise)}>edit</Button></td>
        </tr>
      )
    }
  })
  return (
    <Table striped bordered hover size="sm" className="text-center">
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
