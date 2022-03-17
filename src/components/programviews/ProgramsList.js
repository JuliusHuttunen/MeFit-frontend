import React from 'react';
import { useState, useEffect } from "react";
import  Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { swapProgram } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button'
import { fetchPrograms } from '../../redux/databaseSlice';

const ProgramsList = (props) => {

    const [programList, setProgramList] = useState(props.basket ? <div>Empty</div> : <div></div>)

    const dispatch = useDispatch()
    const userToken = useSelector((state) => state.utility.user.token)
    const programs = useSelector((state) => state.db.programs)

    useEffect(() => {
        const fetchData = async () => {
            if(programs === null || programs.length === 0){
                dispatch(fetchPrograms())
            }
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

                //BASKET VERSION
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
    }, [programs, dispatch])

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