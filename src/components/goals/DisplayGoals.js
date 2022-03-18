import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';
import ConvertDate from '../calendar/ConvertDate';

const DisplayGoals = () => {

    const profile = useSelector((state) => state.utility.profile)
    const [progress, setProgress] = useState()
    const db = useSelector((state) => state.db)

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
        setProgress(goalRatio())
    },[progress])

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

    const goalsMap = profile.goals.map((goal, index) => {
        let currentProgram = null
        if(goal.program !== null){
            currentProgram = getProgram(splitUrl(goal.program))
        }
        const workoutMap = goal.workouts.map((workout, index) => {
            const currentWorkout = getWorkout(splitUrl(workout))
            return(
                <Accordion key={index}>
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{currentWorkout.name}</Accordion.Header>
                        <Accordion.Body>
                            <p>Type: {currentWorkout.type}</p>
                            <p>{currentWorkout.completed ? <>Completed</> : <>Not complete</>}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
        const exerciseMap = goal.exercises.map((exercise, index) => {
            const currentExercise = getExercise(splitUrl(exercise))
            return(
                <Accordion key={index}>
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{currentExercise.name}</Accordion.Header>
                        <Accordion.Body>
                            <p>Muscle group: {currentExercise.targetMuscleGroup}</p>
                            <p>Description: {currentExercise.description}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
        return(
            <Accordion key={index}>
                <Accordion.Item key={index} eventKey={index}>
                    <AccordionHeader><h4>Goal #{index + 1}</h4></AccordionHeader>
                    <Accordion.Body>
                        {goal.achieved ? <div></div> : <div key={index}><h6><ConvertDate text={"Goal end date: "} date={new Date(goal.endDate)}></ConvertDate></h6></div>}
                        {currentProgram !== null ? <h6>Program: {currentProgram.name}</h6> : <></>}
                        {workoutMap}
                        {exerciseMap}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    })

    return (
        <div>
        <Container>
        <h6>Your goal progress this week</h6>
        <ProgressBar style={{"height":"2em","width":"100%"}}now={progress} label={`${progress}%`}/>
        {goalsMap}
        </Container>
        
        </div>
        
    );
};

export default DisplayGoals;