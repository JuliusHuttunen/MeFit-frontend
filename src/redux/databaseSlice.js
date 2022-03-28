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
    workoutStatus: "",
    showExerciseForm: false,
    showWorkoutForm: false,
    showProgramForm: false,
    showEditExercise: false,
    showEditWorkout: false,
    showEditProgram: false,
    currentExercise: {
    },
    currentWorkout: {},
    currentProgram: {}
  },
  reducers: {
    displayExerciseForm: (state) => {
      state.showExerciseForm = !state.showExerciseForm
    },
    displayWorkoutForm: (state) => {
      state.showWorkoutForm = !state.showWorkoutForm
    },
    displayProgramForm: (state) => {
      state.showProgramForm = !state.showProgramForm
    },
    editExercise: (state, action) => {
      state.showEditExercise = !state.showEditExercise
      state.currentExercise = action.payload
    },
    editWorkout: (state, action) => {
      state.showEditWorkout = !state.showEditWorkout
      state.currentWorkout = action.payload
    },
    editProgram: (state, action) => {
      state.showEditProgram = !state.showEditProgram
      state.currentProgram = action.payload
    }
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

export const fetchPrograms = createAsyncThunk('fetchPrograms', async () => {
  const [error, programs] = await getFromAPI("programs")
  console.log("ERR", error)
  return programs
})

export const fetchWorkouts = createAsyncThunk('fetchWorkouts', async () => {
  const [error, workouts] = await getFromAPI("workouts")
  console.log("ERR", error)
  return workouts
})

export const fetchExercises = createAsyncThunk('fetchExercises', async () => {
  const [error, exercises] = await getFromAPI("exercises")
  console.log("ERR", error)
  return exercises
})

/* export const editExercise = createAsyncThunk('editExercise', async () => {
  
}) */

export const { displayExerciseForm, displayWorkoutForm, displayProgramForm, editExercise, editWorkout, editProgram } = databaseSlice.actions

export default databaseSlice.reducer