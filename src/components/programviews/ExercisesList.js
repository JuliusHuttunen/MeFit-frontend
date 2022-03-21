import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../../redux/databaseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Exercise from '../templates/Exercise';


function ExercisesList(props){

    const [exerciseList, setExerciseList] = useState(props.basket ? <div>Empty</div> : <div></div>)
    const dispatch = useDispatch()
    const exercises = useSelector((state) => state.db.exercises)

    useEffect(() => {
        const fetchData = async () => {
            if(exercises === null || exercises.length === 0){
                dispatch(fetchExercises().unwrap())
            }
            setExerciseList(exercises.map((exercise, index) => {
                if(props.basket) return(    
                    <Exercise exercise={exercise} index={index} basket={true}></Exercise>
                )
                return (
                    <Exercise exercise={exercise} index={index}></Exercise>
                )
            }
            ))
        }
        fetchData()
    }, [exercises, dispatch])

    return (
            <div className='accordiongrid'>
                {exerciseList}
            </div>
    )
}

export default ExercisesList;