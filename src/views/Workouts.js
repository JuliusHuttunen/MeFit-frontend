import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';

const Workouts = () => {

    const [workoutList, setWorkoutList] = useState(<div>No workouts found.</div>)
    const [workout, setWorkout] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const [error, workouts] = await getFromAPI("workouts")
            console.log("ERR:", error)
            setWorkout(workouts)
            setWorkoutList(workouts.map((workout, index) => {
                const sets = workout.sets.map((set, index) => {
                    return(
                        <Accordion>
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
                    <Accordion>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{workout.name} {/* <img src="/assets/muscle/abs.png" width={"30 px"} alt="user logo"></img> */}</h4></Accordion.Header>
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

    const filterList = (type) => {
        setWorkoutList(workout.map((workout, index) => {
            const sets = workout.sets.map((set, index) => {
                return(
                    <Accordion>
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
            if(workout.type === type){
            return(
                <Accordion>
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
            if(type === null) {
                return(
                    <Accordion>
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
        }
        ))
    }

    return (
        <div className='cardcontainer'>
            <h2>Workouts</h2>
            <div className="filterwrapper">
                <div onClick={() => filterList(null)} ><h5>All</h5></div>
                <div onClick={() => filterList("Brawn")} ><h5>Brawn</h5></div>
                <div onClick={() => filterList("Warm-up")} ><h5>Warm-up</h5></div>
                <div onClick={() => filterList("Stamina")} ><h5>Stamina</h5></div>
                <div onClick={() => filterList("Beginner")} ><h5>Beginner</h5></div>
                <div onClick={() => filterList("Strength")} ><h5>Strength</h5></div>
            </div>
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {workoutList}
                </div>
            </Container>
        </div>
    );
};

export default Workouts;