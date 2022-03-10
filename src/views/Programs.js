import React from 'react';
import { useState, useEffect } from "react";
import { getFromAPI } from '../components/API/Connection';

const Programs = () => {

    const [programList, setProgramList] = useState(<div>No programs found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, programs] = await getFromAPI("programs")
            console.log(programs)
            setProgramList(programs.map((program, index) => {
                return(
                    <div className='card'>
                        <h4>{program.name}</h4>
                        <p>{program.category}</p>
                    </div>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div className='cardcontainer'>
            <h3>Programs</h3>
            <div className='cards'>
                {programList}
            </div>
        </div>
    );
};

export default Programs;