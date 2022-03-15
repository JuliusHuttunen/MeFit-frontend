import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        profile: null,
        endDate: null,
        achieved: false,
        program: {name: "none"},
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
            state.program = {name: "none"}
        }
    }
})

export const { del, add, swapProgram, addExercise, delExercise, delProgram } = basketSlice.actions

export default basketSlice.reducer