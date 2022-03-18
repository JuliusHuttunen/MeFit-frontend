import React, { useEffect, useState } from 'react';
import  Accordion from 'react-bootstrap/Accordion';
import { addExercise } from '../../redux/basketSlice';
import { fetchExercises } from '../../redux/databaseSlice'
import  Button  from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'


function ExercisesList(props){

    const [exerciseList, setExerciseList] = useState(props.basket ? <div>Empty</div> : <div></div>)

    const dispatch = useDispatch()
    const exercises = useSelector((state) => state.db.exercises)

    useEffect(() => {
        const fetchData = async () => {
            if(exercises === null || exercises.length === 0){
                dispatch(fetchExercises())
            }
            setExerciseList(exercises.map((exercise, index) => {
                const muscleGroupImage = "/assets/muscle/" + exercise.targetMuscleGroup.toLowerCase() + ".png"

                //BASKET VERSION
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
    }, [exercises, dispatch])

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