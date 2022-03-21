import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../../redux/databaseSlice'
import Workout from '../templates/Workout';

const WorkoutsList = (props) => {

    const [workoutList, setWorkoutList] = useState(props.basket ? <div>Empty</div> : <div></div>)
    const dispatch = useDispatch()
    const workouts = useSelector((state) => state.db.workouts)

    useEffect(() => {
        const fetchData = async () => {
            if(workouts === null || workouts.length === 0){
                dispatch(fetchWorkouts().unwrap())
            }
            setWorkoutList(workouts.map((workout, index) => {
                if(props.basket) return (
                    <Workout key={index} workout={workout} index={index} basket={true}></Workout>
                )
                return(
                    <Workout key={index} workout={workout} index={index}></Workout>
                )
            }
            ))
        }
        fetchData()
    }, [workouts, dispatch])

    return (
        <div className='accordiongrid'>
            {workoutList}
        </div>
    );
};

export default WorkoutsList;

