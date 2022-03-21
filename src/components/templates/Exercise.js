import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { addExercise } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button';

const Exercise = (props) => {

    const dispatch = useDispatch()

    const muscleGroupImage = "/assets/muscle/" + props.exercise.targetMuscleGroup.toLowerCase() + ".png"

    const addItemToBasket = (exercise) => {
        dispatch(addExercise(exercise))
    }

    if (props.basket) return (
        <Accordion key={props.index}>
            <Accordion.Item key={props.index} eventKey={props.index}>
                <Accordion.Header><h6>{props.exercise.name} <img src={muscleGroupImage} width={"20 px"} alt="muscle img" ></img></h6></Accordion.Header>
                <Accordion.Body>
                    <p>Description: {props.exercise.description}</p>
                    <p>Target muscle group: {props.exercise.targetMuscleGroup}</p>
                    <Button onClick={() => addItemToBasket(props.exercise)}>Add to draft</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
    
    return (
        <Accordion key={props.index}>
            <Accordion.Item key={props.index} eventKey={props.index}>
                <Accordion.Header><h4>{props.exercise.name} <img src={muscleGroupImage} width={"30 px"} alt="muscle img" ></img></h4></Accordion.Header>
                <Accordion.Body>
                    <h6>Description: </h6><p>{props.exercise.description}</p>
                    <h6>Target muscle group: </h6><p>{props.exercise.targetMuscleGroup}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default Exercise;