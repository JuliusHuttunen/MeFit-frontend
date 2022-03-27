import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../../redux/databaseSlice'
import Workout from '../templates/Workout';

const WorkoutsList = (props) => {

    const isBasket = props.basket
    const [workoutList, setWorkoutList] = useState(<></>)
    const dispatch = useDispatch()
    const workouts = useSelector((state) => state.db.workouts)

    useEffect(() => {
        const fetchData = async () => {
            if (workouts === null || workouts.length === 0) {
                dispatch(fetchWorkouts()).unwrap()
            }
            setWorkoutList(workouts.map((workout, index) => {
                return (
                    <Workout key={index} workout={workout} index={index} basket={isBasket ? true : false}></Workout>
                )
            }))
        }
        fetchData()
    }, [workouts, dispatch, isBasket])

    return (
        <div className='accordiongrid'>
            {workoutList}
        </div>
    );
};

export default WorkoutsList;

