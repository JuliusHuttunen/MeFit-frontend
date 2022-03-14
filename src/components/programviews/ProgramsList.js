import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button'

const ProgramsList = (props) => {

    const [programList, setProgramList] = useState(<div>No programs found.</div>)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const [error, programs] = await getFromAPI("programs")
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
                                    <Button onClick={() => addItemToBasket(program)}>To basket</Button>
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

    const addItemToBasket = (program) => {
        dispatch(add(program))
    }

    return (
        <div className='accordiongrid'>
            {programList}
        </div>
    );
};

export default ProgramsList;