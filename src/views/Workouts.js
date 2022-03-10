import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';

const Workouts = () => {

    const [workoutList, setWorkoutList] = useState(<div>No workouts found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, workouts] = await getFromAPI("workouts")
            console.log(workouts)
            setWorkoutList(workouts.map((workout, index) => {
                return(
                    <div className='card'>
                        <h4>{workout.name}</h4>
                        <p>Type: {workout.type}</p>
                    </div>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div className='cardcontainer'>
            <h3>Workouts</h3>
            <div className='cards'>
                {workoutList}
            </div>
        </div>
    );
};

export default Workouts;