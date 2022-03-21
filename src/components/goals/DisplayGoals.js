import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';
import ConvertDate from '../calendar/ConvertDate';
import Exercise from '../templates/Exercise';
import Workout from '../templates/Workout';
import Program from '../templates/Program';

const DisplayGoals = () => {

    const [progress, setProgress] = useState()
    const [goalsMap, setGoalsMap] = useState(<></>)
    const db = useSelector((state) => state.db)
    const profile = useSelector((state) => state.profile)
    

    useEffect(() => {
        const goalRatio = () => {
            let achieved = 0
            for(let goal of profile.goals){
                if(goal.achieved){
                    achieved++
                }
            }
            return achieved / profile.goals.length * 100
        }
        setGoalsMap(goals())
        setProgress(goalRatio())
    },[])

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

    const goals = () => {
        const profileGoals = profile.goals.map((goal, index) => {
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
                            {goal.achieved ? <div></div> : <div key={index}><h3><ConvertDate text={"Goal end date: "} date={new Date(goal.endDate)}></ConvertDate></h3></div>}
                            {currentProgram !== null ? <Program program={currentProgram} index={1}></Program> : <></>}
                            {workoutMap}
                            {exerciseMap}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
        return profileGoals
    }

    


    return (
        <Container>
            <h6>Your goal progress this week</h6>
            <ProgressBar style={{"height":"2em","width":"100%"}}now={progress} label={`${progress}%`}/>
            <div style={{"paddingTop":"1em"}}className='accordiongrid'>
                {goalsMap}
            </div>
        </Container> 
    );
};

export default DisplayGoals;