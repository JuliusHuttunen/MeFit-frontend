import React from 'react';
import  Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { swapProgram } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button'
import Workout from './Workout';

const Program = (props) => {

    const dispatch = useDispatch()

    const swap = (program) => {
        dispatch(swapProgram(program))
    }

    const workouts = props.program.workouts.map((workout, index) => {
        return(
           <Workout workout={workout} index={index}></Workout>
        )
    })

    if(props.basket) return (
        <Accordion key={props.index}>
            <Accordion.Item key={props.index} eventKey={props.index}>
                <Accordion.Header><h6>{props.program.name} </h6></Accordion.Header>
                <Accordion.Body>
                    <h6>Category: </h6><p>{props.program.category}</p>
                    <Button onClick={() => swap(props.program)}>Add to draft</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )

    return(
        <Accordion key={props.index}>
            <Accordion.Item key={props.index} eventKey={props.index}>
                <Accordion.Header><h4>{props.program.name}</h4></Accordion.Header>
                <Accordion.Body>
                    <h6>Category: </h6><p>{props.program.category}</p>
                    <h6>Workouts: </h6>{workouts}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
};

export default Program;