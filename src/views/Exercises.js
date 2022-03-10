import React, { useEffect, useState } from 'react';
import { getExercises } from '../components/API/ExerciseAPI';

const Exercises = () => {

    const [exerciseList, setExerciseList] = useState(<div>No exercises found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, exercises] = await getExercises()
            console.log(exercises)
            setExerciseList(exercises.map((exercise, index) => {
                return(
                    <div>
                        <p>{exercise.name}</p>
                        <p>{exercise.description}</p>
                    </div>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div>
            {exerciseList}
        </div>
    );
};

export default Exercises;