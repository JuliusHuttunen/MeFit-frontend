import React, { useEffect, useState } from 'react';
import { getFromAPI } from '../components/API/Connection';

const Exercises = () => {

    const [exerciseList, setExerciseList] = useState(<div>No exercises found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, exercises] = await getFromAPI("exercises")
            console.log(exercises)
            setExerciseList(exercises.map((exercise, index) => {
                return(
                    <div className='card'>
                        <h4>{exercise.name}</h4>
                        <p>{exercise.description}</p>
                    </div>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div className='cardcontainer'>
            <h3>Exercises</h3>
            <div className='cards'>
                {exerciseList}
            </div>
        </div>
    );
};

export default Exercises;