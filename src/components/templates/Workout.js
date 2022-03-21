import React from 'react';
import  Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/basketSlice';
import Exercise from './Exercise';

const Workout = (props) => {

    const dispatch = useDispatch()

    const addItemToBasket = (workout) => {
        dispatch(add(workout))
    }

    const sets = props.workout.sets.map((set, index) => {
        return(
            <Accordion key={index}>
                <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header><h6>{set.exercise.name} x {set.exerciseRepetitions}</h6></Accordion.Header>
                    <Accordion.Body>
                        <Exercise exercise={set.exercise} index={index}></Exercise>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    })

    return(
        <Accordion key={props.index}>
            <Accordion.Item key={props.index} eventKey={props.index}>
                <Accordion.Header><h4>{props.workout.name}</h4></Accordion.Header>
                <Accordion.Body>
                    <h6>Type: </h6><p>{props.workout.type}</p>
                    <h6>Sets: </h6>
                    <div className='workoutsetswrapper'>{sets}</div>
                    {props.basket ? <Button onClick={() => addItemToBasket(props.workout)}>Add to draft</Button> : <></>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
};

export default Workout;