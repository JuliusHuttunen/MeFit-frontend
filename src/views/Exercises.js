import React, { useState } from 'react';
import Container  from 'react-bootstrap/Container';
import ExercisesList from '../components/programviews/ExercisesList';
import { useSelector } from 'react-redux';
import Exercise from '../components/templates/Exercise';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
            {exercises === null || exercises.length === 0 ? <p>No exercises found.</p> : <div className="filterwrapper"><Container><Row>
            <Col>
                <img src="/assets/muscle/person.png" alt="muscle img" onClick={() => filterList(null)} ></img>
                <img src="/assets/muscle/abs.png" alt="muscle img" onClick={() => filterList("Abs")} ></img>
                <img src="/assets/muscle/biceps.png" alt="muscle img" onClick={() => filterList("Biceps")} ></img>
                <img src="/assets/muscle/quads.png" alt="muscle img" onClick={() => filterList("Quads")} ></img>
                <img src="/assets/muscle/chest.png" alt="muscle img" onClick={() => filterList("Chest")} ></img>
                <img src="/assets/muscle/forearms.png" alt="muscle img" onClick={() => filterList("Forearms")} ></img>
                </Col>
            </Row></Container></div>
            }
            <Container className='p-3 mb-5'>
                <div className='accordiongrid'>
                    {exerciseList}
                </div>
            </Container>
        </div>
    );
};

export default Exercises;