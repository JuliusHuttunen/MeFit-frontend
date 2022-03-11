import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';

const Workouts = () => {

    const [workoutList, setWorkoutList] = useState(<div>No workouts found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, workouts] = await getFromAPI("workouts")
            console.log("ERR:", error)
            setWorkoutList(workouts.map((workout, index) => {
                const sets = workout.sets.map((set, index) => {
                    return(
                        <div key={index} className="workoutsetwrapper">
                            <h6>{set.exercise.name} x {set.exerciseRepetitions}</h6>
                        </div>
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

    return (
        <div className='cardcontainer'>
            <h2>Workouts</h2>
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {workoutList}
                </div>
            </Container>
        </div>
    );
};

export default Workouts;