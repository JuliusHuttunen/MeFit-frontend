import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ExerciseTable from "./ExerciseTable";
import WorkoutTable from "./WorkoutTable";
import ProgramTable from "./ProgramTable";
import Button from "react-bootstrap/Button";
import ExerciseForm from "./ExerciseForm";
import { useDispatch } from "react-redux";
import { displayExerciseForm, displayProgramForm, displayWorkoutForm } from "../../redux/databaseSlice";
import ProgramForm from "./ProgramForm";
import WorkoutForm from "./WorkoutForm";

const ContributorTabs = () => {

  const dispatch = useDispatch()
  const handleExerciseShow = () => dispatch(displayExerciseForm())
  const handleWorkoutShow = () => dispatch(displayWorkoutForm())
  const handleProgramShow = () => dispatch(displayProgramForm())
  
  return (
    <Tabs defaultActiveKey="exercises" className="mb-3">
      <Tab eventKey="exercises" title="Exercises">
        <ExerciseTable />
        <Button variant="dark" onClick={handleExerciseShow}>
          Add Exercise
        </Button>
        <ExerciseForm></ExerciseForm>
      </Tab>
      <Tab eventKey="workouts" title="Workouts">
        <WorkoutTable />
        <Button variant="dark" onClick={handleWorkoutShow}>Add Workout</Button>
        <WorkoutForm></WorkoutForm>
      </Tab>
      <Tab eventKey="programs" title="Programs">
        <ProgramTable />
        <Button variant="dark" onClick={handleProgramShow}>Add Program</Button>
        <ProgramForm></ProgramForm>
      </Tab>
    </Tabs>
  );
};

export default ContributorTabs;
