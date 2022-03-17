import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postGoalToAPI } from "../components/API/Connection"

const today = new Date()

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        endDate: today,
        achieved: false,
        program: null,
        workouts: [],
        exercises: [],
        goalStatus: ""
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
    },
    extraReducers(builder) {
        builder
          .addCase(addGoal.pending, (state) => {
            state.goalStatus = 'loading'
          })
          .addCase(addGoal.fulfilled, (state) => {
            state.goalStatus = 'succeeded'
          })
    }
})

export const { del, add, swapProgram, addExercise, delExercise, delProgram, swapDate } = basketSlice.actions

export const addGoal = createAsyncThunk('addGoal', async (goal) => {
    const[error, response] = await postGoalToAPI(goal)
    console.log("ERR", error)
    console.log("RESP", response)
})

export default basketSlice.reducer