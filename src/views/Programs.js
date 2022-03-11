import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';

const Programs = () => {

    const [programList, setProgramList] = useState(<div>No programs found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, programs] = await getFromAPI("programs")
            console.log("ERR:", error)
            setProgramList(programs.map((program, index) => {
                const workouts = program.workouts.map((workout, index) => {
                    return(
                        <p key={index}>{workout.name}</p>
                    )
                })
                return(
                    <Accordion>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{program.name} {/* <img src="/assets/muscle/abs.png" width={"30 px"} alt="user logo"></img> */}</h4></Accordion.Header>
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

    return (
        <div className='cardcontainer'>
            <h3>Programs</h3>
            <Container className='w-70 p-3'>
                {programList}
            </Container>
        </div>
    );
};

export default Programs;