import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/basketSlice';
import Exercise from './Exercise';
import Row from 'react-bootstrap/Row';

const Workout = (props) => {

    const [workout, setWorkout] = useState({})

    useEffect(() => {
        setWorkout(props.workout)
    }, [workout])

    const dispatch = useDispatch()

    const addItemToBasket = (workout) => {
        dispatch(add(workout))
    }

    let sets = <></>

    try {
        sets = workout.sets.map((set, index) => {
            return (
                <Accordion key={index}>
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header><h6>Exercise: {set.exercise.name} x {set.exerciseRepetitions}</h6></Accordion.Header>
                        <Accordion.Body>
                            <Exercise exercise={set.exercise} index={index}></Exercise>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
    } catch (error) {
        return <></>
    }


    try {
        return (
            <Accordion key={props.index}>
                <Accordion.Item key={props.index} eventKey={props.index}>
                    <Accordion.Header><h4>Workout: {workout.name}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h6>Type: </h6><p>{workout.type}</p>
                        <h6>Sets: </h6>
                        <div className='workoutsetswrapper'>{sets}</div>
                        <hr />
                        {props.basket ? <Row><Button onClick={() => addItemToBasket(workout)}>Add to draft</Button></Row> : <></>}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }
    catch (error) {
        return <></>
    }
};

export default Workout;