import React from 'react';
import { useState, useEffect } from "react";
import  Container  from 'react-bootstrap/Container';
import ProgramsList from '../components/programviews/ProgramsList';
import { useSelector } from 'react-redux';
import Program from '../components/templates/Program';
import Exercises from './Exercises';

const Programs = () => {

    const [programList, setProgramList] = useState(<ProgramsList/>)
    const programs = useSelector((state) => state.db.programs)
    const [categories, setCategories] = useState([])

    //Generate categories
    useEffect(() => {
        const generateFilters = () => {
            for(let program of programs){
                if(!categories.includes(program.category)){
                    setCategories([...categories, program.category])
                }
            }
        }
        generateFilters()
    }, [programs, categories])

    const filterList = (category) => {
        setProgramList(programs.map((program, index) => {
            if(program.category === category || category === null){
                return(
                   <Program key={index} program={program} index={index}></Program>
                )
            } 
            return <></>
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