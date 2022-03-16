import { createSlice } from "@reduxjs/toolkit";

const today = new Date()

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        endDate: today,
        achieved: false,
        program: null,
        workouts: [],
        exercises: []
    },
    reducers: {
        add: (state, action) => {
            state.workouts.push(action.payload)
        },
        del: (state, action) => {
            state.workouts.splice(action.payload, 1)
        },
        swapProgram: (state, action) => {
            state.program = action.payload
        },
        addExercise: (state, action) => {
            state.exercises.push(action.payload)
        },
        delExercise: (state, action) => {
            state.exercises.splice(action.payload, 1)
        },
        delProgram: (state) => {
            state.program = null
        },
        swapDate: (state, action) => {
            state.endDate = action.payload
        }
    }
})

export const { del, add, swapProgram, addExercise, delExercise, delProgram, swapDate } = basketSlice.actions

export default basketSlice.reducer