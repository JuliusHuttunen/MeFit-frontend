import React from 'react';
import { useState, useEffect } from "react";
import { fetchPrograms } from '../../redux/databaseSlice';
import Program from '../templates/Program';
import { useDispatch, useSelector } from 'react-redux';

const ProgramsList = (props) => {

    const [programList, setProgramList] = useState(props.basket ? <div>Empty</div> : <div></div>)
    const dispatch = useDispatch()
    const programs = useSelector((state) => state.db.programs)

    useEffect(() => {
        const fetchData = async () => {
            if(programs === null || programs.length === 0){
                dispatch(fetchPrograms().unwrap())
            }
            setProgramList(programs.map((program, index) => {
                if(props.basket) return (
                    <Program key={index} program={program} index={index} basket={true}></Program>
                )
                return(
                    <Program key={index} program={program} index={index}></Program>
                )
            }
            ))
        }
        fetchData()
    }, [programs, dispatch])

    return (
        <div className='accordiongrid'>
            {programList}
        </div>
    );
};

export default ProgramsList;