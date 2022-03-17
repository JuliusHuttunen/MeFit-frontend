import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromAPI } from "../components/API/Connection"

export const databaseSlice = createSlice({
    name: 'db',
    initialState: {
        programs: [],
        workouts: [],
        exercises: [],
        exerciseStatus: "",
        programStatus: "",
        workoutStatus: ""
    },
    reducers: {
    },
    extraReducers(builder) {
        builder
          .addCase(fetchExercises.pending, (state) => {
            state.exerciseStatus = 'loading'
          })
          .addCase(fetchExercises.fulfilled, (state, action) => {
            state.exerciseStatus = 'succeeded'
            state.exercises = action.payload
          })
          .addCase(fetchPrograms.pending, (state) => {
            state.programStatus = 'loading'
          })
          .addCase(fetchPrograms.fulfilled, (state, action) => {
            state.programStatus = 'succeeded'
            state.programs = action.payload
          })
          .addCase(fetchWorkouts.pending, (state) => {
            state.workoutStatus = 'loading'
          })
          .addCase(fetchWorkouts.fulfilled, (state, action) => {
            state.workoutStatus = 'succeeded'
            state.workouts = action.payload
          })
      }
})

export const fetchPrograms = createAsyncThunk('fetchPrograms', async (userToken) => {
    const[error, programs] = await getFromAPI("programs")
    console.log("ERR", error)
    return programs
})

export const fetchWorkouts = createAsyncThunk('fetchWorkouts', async (userToken) => {
    const[error, workouts] = await getFromAPI("workouts")
    console.log("ERR", error)
    return workouts
})

export const fetchExercises = createAsyncThunk('fetchExercises', async (userToken) => {
    const[error, exercises] = await getFromAPI("exercises")
    console.log("ERR", error)
    return exercises
})

export const { addExercises } = databaseSlice.actions

export default databaseSlice.reducer