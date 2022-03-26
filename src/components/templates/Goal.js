import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Workout from './Workout'
import Exercise from './Exercise';
import Program from './Program';
import { useSelector, useDispatch } from 'react-redux';
import { setGoalCompleted, setExerciseCompleted, setWorkoutCompleted } from '../API/Connection';
import { fetchProfile } from '../../redux/profileSlice';
import { format } from 'date-fns';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"

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

    const markExerciseAsCompleted = async (goal, boolean, exerciseId) => {
        const [error, response] = await setExerciseCompleted(goal, boolean, exerciseId)
        console.log("ERR:", error)
        console.log("RESP:", response)
        await dispatch(fetchProfile()).unwrap()
    }

    const markWorkoutAsCompleted = async (goal, boolean, workoutId) => {
        const [error, response] = await setWorkoutCompleted(goal, boolean, workoutId)
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
            <div key={index}>
                <Row>
                    <Col>
                        <Workout workout={currentWorkout} index={index}></Workout>
                        {workout.completed ? <Button variant="secondary" onClick={() => markWorkoutAsCompleted(props.goal, false, currentWorkout.workoutId)}>Revert</Button> : <Button variant="success" onClick={() => markWorkoutAsCompleted(props.goal, true, currentWorkout.workoutId)}>Mark as completed</Button>}
                    </Col>
                </Row>
                <hr />
            </div>
        )
    })
    //Map the exercises
    const exerciseMap = props.goal.exercises.map((exercise, index) => {
        const currentExercise = getExercise(exercise.exercise.exerciseId)
        return (
            <div key={index}>
                <Row>
                    <Col>
                        <Exercise exercise={currentExercise} index={index}></Exercise>
                        {exercise.completed ? <Button variant="secondary" onClick={() => markExerciseAsCompleted(props.goal, false, currentExercise.exerciseId)}>Revert</Button> : <Button variant="success" onClick={() => markExerciseAsCompleted(props.goal, true, currentExercise.exerciseId)}>Mark as completed</Button>}
                        <hr />
                    </Col>
                </Row>
            </div>
        )
    })

    return (
        <Container>
            <Accordion key={props.index}>
                <Accordion.Item style={{ "backgroundColor": props.achieved ? "#defade" : "white" }} key={props.index} eventKey={props.index}>
                    <Accordion.Header >{props.history ? <h4 style={{ "marginRight": "2em" }}>Goal ({format(new Date(props.goal.startDate), "dd.MM.yyyy")}-{format(new Date(props.goal.endDate), "dd.MM.yyyy")})</h4> : <><h4 style={{ "marginRight": "2em" }}>Goal #{props.counter}</h4><h4 style={{ "fontStyle": "italic" }}>{props.difference} whole day(s) left</h4></>}</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <h4>Goal timespan: {format(new Date(props.goal.startDate), "dd.MM.yyyy")}-{format(new Date(props.goal.endDate), "dd.MM.yyyy")}</h4>
                        </div>
                        {currentProgram !== null ? <><Program program={currentProgram} index={1}></Program><hr /></> : <></>}
                        {props.goal.workouts.length !== 0 ? <><Accordion key={3}>
                            <Accordion.Item key={3} eventKey={3}>
                                <Accordion.Header><h4>Workouts</h4></Accordion.Header>
                                <Accordion.Body>
                                    {workoutMap}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion><hr /></> : <></>}
                        {props.goal.exercises.length !== 0 ? <><Accordion key={2}>
                            <Accordion.Item key={2} eventKey={2}>
                                <Accordion.Header><h4>Custom workout</h4></Accordion.Header>
                                <Accordion.Body>
                                    {exerciseMap}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion><hr /></> : <></>}

                        <Container>
                            <Row style={{ width: "50%" }}>
                                {props.goal.achieved ? <Button variant="secondary" onClick={() => markGoalAsCompleted(props.goal, false)}>Revert</Button> : <Button variant="success" onClick={() => markGoalAsCompleted(props.goal, true)}>Mark goal as completed</Button>}
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default Goal;