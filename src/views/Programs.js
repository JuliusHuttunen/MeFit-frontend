import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';
import ProgramsList from '../components/programviews/ProgramsList';

const Programs = () => {

    const [programList, setProgramList] = useState(<ProgramsList/>)
    const [program, setProgram] = useState([])
    const [categories, setCategories] = useState([])
    const categArray = []

    useEffect(() => {
        const fetchData = async () => {
            const [error, programs] = await getFromAPI("programs")
            console.log("ERR:", error)
            for(let program of programs){
                if(!categArray.includes(program.category)){
                    categArray.push(program.category)
                }
            }
            setCategories(categArray)
            setProgram(programs)
        }
        fetchData()
    }, [])

    const filterList = (category) => {
        setProgramList(program.map((program, index) => {
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
            if(program.category === category || category === null){
                return(
                    <Accordion key={index}>
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><h4>{program.name} {/* <img src="/assets/muscle/abs.png" width={"30 px"} alt="user logo"></img> */}</h4></Accordion.Header>
                            <Accordion.Body><h6>Category: </h6><p>{program.category}</p>
                                <h6>Workouts: </h6>{workouts}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
            }
        }
        ))
    }

    const filters = categories.map((categ, index) => {
        return(
            <div key={index} onClick={() => filterList(categ)} ><h5>{categ}</h5></div>
        )
    }
    )

    return (
        <div className='cardcontainer'>
            <h2>Programs</h2>
            <div className="filterwrapper">
            <div onClick={() => filterList(null)} ><h5>All</h5></div>
                {filters}
            </div>
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {programList}
                </div>
            </Container>
        </div>
    );
};

export default Programs;