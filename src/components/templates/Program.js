import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { swapProgram } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button'
import Workout from './Workout';
import Row from 'react-bootstrap/Row'

const Program = (props) => {

    const [program, setProgram] = useState({})
    useEffect(() => {
        setProgram(props.program)
    }, [program])

    const dispatch = useDispatch()

    const swap = (program) => {
        dispatch(swapProgram(program))
    }

    let workouts = <></>

    try {
        workouts = program.workouts.map((workout, index) => {
            return (
                <Workout key={index} workout={workout} index={index}></Workout>
            )
        })
    } catch (error) {
        return <></>
    }

    try {
        return (
            <Accordion key={props.index}>
                <Accordion.Item key={props.index} eventKey={props.index}>
                    <Accordion.Header><h4>Program: {program.name}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h6>Category: </h6><p>{program.category}</p>
                        <h6>Workouts: </h6>
                        <div className='accordiongrid'>
                            {workouts}
                        </div>
                        <hr />
                        {props.basket ? <Row><Button onClick={() => swap(program)}>Add to draft</Button></Row> : <></>}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }
    catch (error) {
        return <></>
    }
};

export default Program;