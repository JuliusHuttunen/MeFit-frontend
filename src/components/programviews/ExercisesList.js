import React, { useEffect, useState } from 'react';
import { getFromAPI } from '../API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import { addExercise } from '../../redux/basketSlice';
import  Button  from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux'


function ExercisesList(props){

    const [exerciseList, setExerciseList] = useState(<div>No exercises found.</div>)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const [error, exercises] = await getFromAPI("exercises")
            console.log("ERR:", error)
            setExerciseList(exercises.map((exercise, index) => {
                const muscleGroupImage = "/assets/muscle/" + exercise.targetMuscleGroup.toLowerCase() + ".png"
                if(props.basket){
                    return(
                        <Accordion key={index}>
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header><h6>{exercise.name} <img src={muscleGroupImage} width={"20 px"} alt="muscle img" ></img></h6></Accordion.Header>
                                <Accordion.Body>
                                    <p>Description: {exercise.description}</p>
                                    <p>Target muscle group: {exercise.targetMuscleGroup}</p>
                                    <Button onClick={() => addItemToBasket(exercise)}>Add to draft</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                }
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
            ))
        }
        fetchData()
    }, [])

    const addItemToBasket = (exercise) => {
        dispatch(addExercise(exercise))
    }

    return(
            <div className='accordiongrid'>
                {exerciseList}
            </div>
    )
}

export default ExercisesList;