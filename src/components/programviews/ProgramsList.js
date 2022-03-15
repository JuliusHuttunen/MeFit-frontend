import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { swapProgram } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button'

const ProgramsList = (props) => {

    const [programList, setProgramList] = useState(props.basket ? <div>Empty</div> : <div></div>)
    const dispatch = useDispatch()
    const userToken = useSelector((state) => state.utility.user.token)

    useEffect(() => {
        const fetchData = async () => {
            const [error, programs] = await getFromAPI("programs", userToken)
            console.log("ERR:", error)
            setProgramList(programs.map((program, index) => {
                const workouts = program.workouts.map((workout, index) => {
                    return(
                        <Accordion key={index}>
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header><h6>{workout.name}</h6></Accordion.Header>
                                <Accordion.Body><h6>Type: </h6><p>{workout.type}</p></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
                if(props.basket){
                    return(
                        <Accordion key={index}>
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header><h6>{program.name} </h6></Accordion.Header>
                                <Accordion.Body><h6>Category: </h6><p>{program.category}</p>
                                    <Button onClick={() => swap(program)}>Add to draft</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                }
                return(
                    <Accordion key={index}>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{program.name}</h4></Accordion.Header>
                            <Accordion.Body><h6>Category: </h6><p>{program.category}</p>
                                <h6>Workouts: </h6>{workouts}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
            ))
        }
        fetchData()
    }, [])

    const swap = (program) => {
        dispatch(swapProgram(program))
    }

    return (
        <div className='accordiongrid'>
            {programList}
        </div>
    );
};

export default ProgramsList;