import React, { useState } from 'react';
import Container  from 'react-bootstrap/Container';
import ExercisesList from '../components/programviews/ExercisesList';
import { useSelector } from 'react-redux';
import Exercise from '../components/templates/Exercise';

const Exercises = () => {

    const [exerciseList, setExerciseList] = useState(<ExercisesList/>)
    const exercises = useSelector((state) => state.db.exercises)

    const filterList = (musclegroup) => {
        setExerciseList(exercises.map((exercise, index) => {
            if(exercise.targetMuscleGroup === musclegroup || musclegroup === null){
                return(
                    <Exercise key={index} exercise={exercise} index={index}></Exercise>
                )
            }
            return <></>
        }
        ))
    }

    return (
        <div className='cardcontainer'>
            <h2>Exercises</h2>
            {exercises === null ? <p>No exercises found.</p> : <div className="filterwrapper">
                <img src="/assets/muscle/person.png" alt="muscle img" onClick={() => filterList(null)} ></img>
                <img src="/assets/muscle/abs.png" alt="muscle img" onClick={() => filterList("Abs")} ></img>
                <img src="/assets/muscle/biceps.png" alt="muscle img" onClick={() => filterList("Biceps")} ></img>
                <img src="/assets/muscle/quads.png" alt="muscle img" onClick={() => filterList("Quads")} ></img>
                <img src="/assets/muscle/chest.png" alt="muscle img" onClick={() => filterList("Chest")} ></img>
                <img src="/assets/muscle/forearms.png" alt="muscle img" onClick={() => filterList("Forearms")} ></img>
            </div>
            }
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {exerciseList}
                </div>
            </Container>
        </div>
    );
};

export default Exercises;