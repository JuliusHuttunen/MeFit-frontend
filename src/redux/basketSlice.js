import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        endDate: null,
        achieved: false,
        program: {name: "none"},
        workouts: [],

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
        }
    }
})

export const { del, add, swapProgram } = basketSlice.actions

export default basketSlice.reducer