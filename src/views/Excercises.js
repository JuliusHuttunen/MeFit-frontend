import React, { useEffect, useState } from 'react';
import { getExcersises } from '../components/API/ExcersiseAPI';

const Excercises = () => {

    const [excerciseList, setExcerciseList] = useState(<div>No excercises found.</div>)

    useEffect(() => {
        const fetchData = async () => {
            const [error, excercises] = await getExcersises()
            console.log(excercises)
            setExcerciseList(excercises.map((excercise, index) => {
                return(
                    <div>
                        <p>{excercise.name}</p>
                        <p>{excercise.description}</p>
                    </div>
                )
            }
            ))
        }
        fetchData()
    }, [])

    return (
        <div>
            {excerciseList}
        </div>
    );
};

export default Excercises;