import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';
import WorkoutsList from '../components/programviews/WorkoutsList';

const Workouts = () => {

    const [workoutList, setWorkoutList] = useState(<WorkoutsList/>)
    const [workout, setWorkout] = useState([])
    const [types, setTypes] = useState([])
    const typeArray = []

    //Generate workout filters based on types, set workouts
    useEffect(() => {
        const fetchData = async () => {
            const [error, workouts] = await getFromAPI("workouts")
            console.log("ERR:", error)
            for(let wo of workouts){
                if(!typeArray.includes(wo.type)){
                    typeArray.push(wo.type)
                }
            }
            setTypes(typeArray)
            setWorkout(workouts)
        }
        fetchData()
    }, [])

    //Filter the list
    const filterList = (type) => {
        setWorkoutList(workout.map((workout, index) => {
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
            if(workout.type === type || type === null){
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
        }
        ))
    }

    //Create a filter component
    const filters = types.map((type, index) => {
        return(
            <div key={index} onClick={() => filterList(type)}><h5>{type}</h5></div>
        )
    }
    )

    return (
        <div className='cardcontainer'>
            <h2>Workouts</h2>
            <div className="filterwrapper">
            <div onClick={() => filterList(null)} ><h5>All</h5></div>
                {filters}
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