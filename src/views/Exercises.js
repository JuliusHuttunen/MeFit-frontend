import React, { useEffect, useState } from 'react';
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';


const Exercises = () => {

    const [exerciseList, setExerciseList] = useState(<div>No exercises found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, exercises] = await getFromAPI("exercises")
            console.log(exercises)
            setExerciseList(exercises.map((exercise, index) => {
                return(
                    
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{exercise.name} <img src="/assets/muscle/abs.png" width={"30 px"} alt="user logo"></img></h4></Accordion.Header>
                        <Accordion.Body><p>{exercise.description}</p></Accordion.Body>
                        </Accordion.Item>
                    
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div className='cardcontainer'>
            <h3>Exercises</h3>
            <Container className='w-50 p-3'>
            <Accordion>
                {exerciseList}
                </Accordion>
            </Container>
        </div>
    );
};

export default Exercises;