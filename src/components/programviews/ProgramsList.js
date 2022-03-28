//A list of programs displayed in exercise view and goal generator
import React from 'react';
import { useState, useEffect } from "react";
import { fetchPrograms } from '../../redux/databaseSlice';
import Program from '../templates/Program';
import { useDispatch, useSelector } from 'react-redux';

const ProgramsList = (props) => {

    const isBasket = props.basket
    const [programList, setProgramList] = useState(<></>)
    const dispatch = useDispatch()
    const programs = useSelector((state) => state.db.programs)

    useEffect(() => {
        const fetchData = async () => {
            if (programs === null || programs.length === 0) {
                dispatch(fetchPrograms()).unwrap()
            }
            setProgramList(programs.map((program, index) => {
                return (
                    <Program key={index} program={program} index={index} basket={isBasket ? true : false}></Program>
                )
            }))
        }
        fetchData()
    }, [programs, dispatch, isBasket])

    return (
        <div className='accordiongrid'>
            {programList}
        </div>
    );
};

export default ProgramsList;