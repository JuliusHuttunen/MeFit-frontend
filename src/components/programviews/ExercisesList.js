import React, { useEffect, useState } from 'react';
import { getFromAPI } from '../API/Connection';
import  Accordion from 'react-bootstrap/Accordion';


function ExercisesList(){

    const [exerciseList, setExerciseList] = useState(<div>No exercises found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, exercises] = await getFromAPI("exercises")
            console.log("ERR:", error)
            setExerciseList(exercises.map((exercise, index) => {
                const muscleGroupImage = "/assets/muscle/" + exercise.targetMuscleGroup.toLowerCase() + ".png"
                return(
                    <Accordion key={index}>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{exercise.name} <img src={muscleGroupImage} width={"30 px"} alt="muscle img" ></img></h4></Accordion.Header>
                            <Accordion.Body>
                                <h6>Description: </h6><p>{exercise.description}</p>
                                <h6>Target muscle group: </h6><p>{exercise.targetMuscleGroup}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return(
            <div className='accordiongrid'>
                {exerciseList}
            </div>
    )
}

export default ExercisesList;