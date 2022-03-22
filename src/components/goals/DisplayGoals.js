import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import Exercise from '../templates/Exercise';
import Workout from '../templates/Workout';
import Program from '../templates/Program';
import { format, differenceInDays } from 'date-fns';
import { setGoalCompleted } from '../API/Connection';
import { fetchProfile } from '../../redux/profileSlice';

const DisplayGoals = () => {


    const [progress, setProgress] = useState()
    const [goalsMap, setGoalsMap] = useState(<></>)
    const db = useSelector((state) => state.db)
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const difference = differenceInDays(useSelector((state) => state.basket.endDate), new Date())
    
    useEffect(() => {
        const goalRatio = () => {
            let achieved = 0
            if(profile.goals === undefined || profile.goals === null || profile.goals.length === 0) return 0
            for(let goal of profile.goals){
                if(goal.achieved){
                    achieved++
                }
            }
            return (achieved / profile.goals.length * 100).toFixed(1)
        }
        setGoalsMap(goals())
        setProgress(goalRatio())
    },[profile])

    const splitUrl = (url) => {
        const split = url.split("/")
        const finalIndex = split[split.length - 1]
        return finalIndex
    }


    const getWorkout = (index) => {
        for(let workout of db.workouts){
            if(workout.workoutId == index){
                return workout
            }
        }
    }

    const getExercise = (index) => {
        for(let exercise of db.exercises){
            if(exercise.exerciseId == index){
                return exercise
            }
        }
    }

    const getProgram = (index) => {
        for(let program of db.programs){
            if(program.programId == index){
                return program
            }
        }
    }

    const markGoalAsCompleted = async (goal, boolean) => {
        const[error, response] = await setGoalCompleted(goal, boolean)
        console.log("ERR:", error)
        console.log("RESP:", response)
        await dispatch(fetchProfile()).unwrap()
    }

    const goals = () => {
        let profileGoals
        if(!!profile.goals){
        profileGoals = 
            profile.goals.map((goal, index) => {
            let currentProgram = null
            if(goal.program !== null){
                currentProgram = getProgram(splitUrl(goal.program))
            }
            const workoutMap = goal.workouts.map((workout, index) => {
                const currentWorkout = getWorkout(splitUrl(workout))
                return(
                    <Workout key={index} workout={currentWorkout} index={index}></Workout>
                )
            })
            const exerciseMap = goal.exercises.map((exercise, index) => {
                const currentExercise = getExercise(splitUrl(exercise))
                return(
                    <Exercise key={index} exercise={currentExercise} index={index}></Exercise>
                )
            })
            return(
                <Accordion key={index}>
                    <Accordion.Item key={index} eventKey={index}>
                        <AccordionHeader><h4>Goal #{index + 1}</h4></AccordionHeader>
                        <Accordion.Body>
                            <div><h4>Goal end date: {format(new Date(goal.endDate), "dd.MM.yyyy")}</h4></div>
                            {currentProgram !== null ? <Program program={currentProgram} index={1}></Program> : <></>}
                            {workoutMap}
                            {exerciseMap}
                            {goal.achieved ? <Button variant="secondary" onClick={() => markGoalAsCompleted(goal, false)}>Revert</Button> : <Button variant="success" onClick={() => markGoalAsCompleted(goal, true)}>Mark as completed</Button>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
        }
        else profileGoals = <></>

        return profileGoals
    }

    return (
        <Container>
            {progress === "100.0" ? <h3>You have completed all your goals! Congratulations!</h3>: <h3>You still have {difference} days to complete your goals.</h3>}
            <h6>Your goal progress this week</h6>
            <ProgressBar variant="success" style={{"height":"2em","width":"100%", "fontSize":"1.7em"}}now={progress} label={`${progress}%`}/>
            <div style={{"paddingTop":"1em"}} className='accordiongrid2'>
                {goalsMap}
            </div>
        </Container> 
    );
};

export default DisplayGoals;