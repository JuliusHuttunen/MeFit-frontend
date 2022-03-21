import React from 'react';
import { useState, useEffect } from "react";
import  Container  from 'react-bootstrap/Container';
import WorkoutsList from '../components/programviews/WorkoutsList';
import { useSelector } from 'react-redux';
import Workout from '../components/templates/Workout';

const Workouts = () => {

    const [workoutList, setWorkoutList] = useState(<WorkoutsList/>)
    const workouts = useSelector((state) => state.db.workouts)
    const [types, setTypes] = useState([])

    //Generate types
    useEffect(() => {
        const generateFilters = () => {
            for(let wo of workouts){
                if(!types.includes(wo.type)){
                    setTypes([...types, wo.type])
                }
            }
        }
        generateFilters()
    }, [workouts, types])

    const filterList = (type) => {
        setWorkoutList(workouts.map((workout, index) => {
            if(workout.type === type || type === null) {
                return(
                    <Workout key={index} workout={workout} index={index}></Workout>
                )
            }
        }
        ))
    }

    const filters = types.map((type, index) => {
        return(
            <div key={index} onClick={() => filterList(type)}><h5>{type}</h5></div>
        )
    }
    )

    return (
        <div className='cardcontainer'>
            <h2>Workouts</h2>
            {workouts === null ? <p>No workouts found.</p> : 
            <div className="filterwrapper">
                <div onClick={() => filterList(null)} ><h5>All</h5></div>
                {filters}
            </div>}
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {workoutList}
                </div>
            </Container>
        </div>
    );
};

export default Workouts;