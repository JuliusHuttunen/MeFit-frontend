import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../API/Connection';
import  Accordion from 'react-bootstrap/Accordion';

const WorkoutsList = () => {

    const [workoutList, setWorkoutList] = useState(<div>No workouts found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, workouts] = await getFromAPI("workouts")
            console.log("ERR:", error)
            setWorkoutList(workouts.map((workout, index) => {
                const sets = workout.sets.map((set, index) => {
                    return(
                        <Accordion key={index}>
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header><h6>{set.exercise.name} x {set.exerciseRepetitions}</h6></Accordion.Header>
                                <Accordion.Body>
                                    <p>Description: {set.exercise.description}</p>
                                    <p>Muscles: {set.exercise.targetMuscleGroup}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
                return(
                    <Accordion key={index}>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{workout.name}</h4></Accordion.Header>
                            <Accordion.Body>
                                <h6>Type: </h6><p>{workout.type}</p>
                                <h6>Sets: </h6><div className='workoutsetswrapper'>{sets}</div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div className='accordiongrid'>
            {workoutList}
        </div>
    );
};

export default WorkoutsList;

