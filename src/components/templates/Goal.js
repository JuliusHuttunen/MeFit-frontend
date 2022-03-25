import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Workout from './Workout'
import Exercise from './Exercise';
import Program from './Program';
import { useSelector, useDispatch } from 'react-redux';
import { setGoalCompleted } from '../API/Connection';
import { fetchProfile } from '../../redux/profileSlice';
import { format } from 'date-fns';
import Button from "react-bootstrap/Button"

const Goal = (props) => {

    const db = useSelector((state) => state.db)

    const dispatch = useDispatch()

    //Get workout from db with index
    const getWorkout = (index) => {
        for (let workout of db.workouts) {
            if (workout.workoutId == index) {
                return workout
            }
        }
    }

    //Get exercise from db with index
    const getExercise = (index) => {
        for (let exercise of db.exercises) {
            if (exercise.exerciseId == index) {
                return exercise
            }
        }
    }

    //Get program from db with index
    const getProgram = (index) => {
        for (let program of db.programs) {
            if (program.programId == index) {
                return program
            }
        }
    }

    //Mark goal achieved, fetch updated profile
    const markGoalAsCompleted = async (goal, boolean) => {
        const [error, response] = await setGoalCompleted(goal, boolean)
        console.log("ERR:", error)
        console.log("RESP:", response)
        await dispatch(fetchProfile()).unwrap()
    }

    //Initialize goal program
    let currentProgram = null
    //Assign a value if not null
    if (!!props.goal.program) {
        currentProgram = getProgram(props.goal.program.programId)
    }
    //Map the workouts
    const workoutMap = props.goal.workouts.map((workout, index) => {
        const currentWorkout = getWorkout(workout.workout.workoutId)
        return (
            <>
            <Workout key={index} workout={currentWorkout} index={index}></Workout>
            {workout.completed ? <>Completed</> : <Button>Mark as completed</Button>}
            </>
        )
    })
    //Map the exercises
    const exerciseMap = props.goal.exercises.map((exercise, index) => {
        const currentExercise = getExercise(exercise.exercise.exerciseId)
        return (
            <>
            <Exercise key={index} exercise={currentExercise} index={index}></Exercise>
            {exercise.completed ? <>Completed</> : <Button>Mark as completed</Button>}
            </>
        )
    })

    return (
        <Accordion key={props.index}>
            <Accordion.Item style={{ "backgroundColor": props.achieved ? "#defade" : "white" }} key={props.index} eventKey={props.index}>
                <Accordion.Header >{props.history ? <h4 style={{ "marginRight": "2em" }}>Goal ({format(new Date(props.goal.startDate), "dd.MM.yyyy")}-{format(new Date(props.goal.endDate), "dd.MM.yyyy")})</h4> : <><h4 style={{ "marginRight": "2em" }}>Goal #{props.counter}</h4><h4 style={{ "fontStyle": "italic" }}>{props.difference} days left</h4></>}</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <h4>Goal timespan: {format(new Date(props.goal.startDate), "dd.MM.yyyy")}-{format(new Date(props.goal.endDate), "dd.MM.yyyy")}</h4>
                    </div>
                    {currentProgram !== null ? <Program program={currentProgram} index={1}></Program> : <></>}
                    {workoutMap}
                    {props.goal.exercises.length !== 0 ? <Accordion key={props.index}>
                        <Accordion.Item key={2} eventKey={2}>
                            <Accordion.Header><h4>Custom workout</h4></Accordion.Header>
                            <Accordion.Body>
                                {exerciseMap}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> : <></>}
                    {props.goal.achieved ? <Button style={{ "margin": "10px" }} variant="secondary" onClick={() => markGoalAsCompleted(props.goal, false)}>Revert</Button> : <Button style={{ "margin": "10px" }} variant="success" onClick={() => markGoalAsCompleted(props.goal, true)}>Mark as completed</Button>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default Goal;