import React, { useState } from 'react';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';
import ExercisesList from '../components/programviews/ExercisesList';
import { useSelector } from 'react-redux';

const Exercises = () => {

    const [exerciseList, setExerciseList] = useState(<ExercisesList/>)
    const exercises = useSelector((state) => state.db.exercises)

    const filterList = (musclegroup) => {
        setExerciseList(exercises.map((exercise, index) => {
            const muscleGroupImage = "/assets/muscle/" + exercise.targetMuscleGroup.toLowerCase() + ".png"
            if(exercise.targetMuscleGroup === musclegroup || musclegroup === null){
                return(
                    <Accordion key={index}>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{exercise.name} <img src={muscleGroupImage} width={"30 px"} alt="muscle img" ></img></h4></Accordion.Header>
                            <Accordion.Body>
                                <h6>Description: </h6><p>{exercise.description}</p>
                                <h6>Target muscle group: </h6><p>{exercise.targetMuscleGroup}</p>
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