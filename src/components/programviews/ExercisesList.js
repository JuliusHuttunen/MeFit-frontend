import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../../redux/databaseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Exercise from '../templates/Exercise';


function ExercisesList(props){

    const isBasket = props.basket
    const [exerciseList, setExerciseList] = useState(<></>)
    const dispatch = useDispatch()
    const exercises = useSelector((state) => state.db.exercises)

    useEffect(() => {
        const fetchData = async () => {
            if(exercises === null || exercises.length === 0){
                dispatch(fetchExercises().unwrap())
            }
            setExerciseList(exercises.map((exercise, index) => {
                return (    
                    <Exercise key={index} exercise={exercise} index={index} basket={isBasket ? true : false}></Exercise>
                )   
            }))
        }
        fetchData()
    }, [exercises, dispatch, isBasket])

    return (
            <div className='accordiongrid'>
                {exerciseList}
            </div>
    )
}

export default ExercisesList;