import React from 'react';
import { useState, useEffect } from "react";
import  Accordion from 'react-bootstrap/Accordion';
import  Container  from 'react-bootstrap/Container';
import ProgramsList from '../components/programviews/ProgramsList';
import { useSelector } from 'react-redux';

const Programs = () => {

    const [programList, setProgramList] = useState(<ProgramsList/>)
    const programs = useSelector((state) => state.db.programs)
    const [categories, setCategories] = useState([])

    //Generate categories
    useEffect(() => {
        const fetchData = async () => {
            for(let program of programs){
                if(!categories.includes(program.category)){
                    setCategories([...categories, program.category])
                }
            }
        }
        fetchData()
    }, [programs, categories])

    const filterList = (category) => {
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
            if(program.category === category || category === null){
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
        }
        ))
    }

    const filters = categories.map((category, index) => {
        return(
            <div key={index} onClick={() => filterList(category)} ><h5>{category}</h5></div>
        )
    }
    )

    return (
        <div className='cardcontainer'>
            <h2>Programs</h2>
            {programs === null || programs.length === 0 ? <p>No programs found.</p> : 
            <div className="filterwrapper">
                <div onClick={() => filterList(null)}>
                    <h5>All</h5>
                </div>
                {filters}
            </div>}
            <Container className='w-70 p-3'>
                <div className='accordiongrid'>
                    {programList}
                </div>
            </Container>
        </div>
    );
};

export default Programs;