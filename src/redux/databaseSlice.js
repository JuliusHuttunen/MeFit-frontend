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
      .addCase(editExercise.pending, () => {
        console.log("Updating current exercise in store...")
      })
      .addCase(editExercise.fulfilled, (state, action) => {
        state.currentExercise = action.payload
        state.showEditExercise = !state.showEditExercise
        console.log("Update complete")
      })
      .addCase(editWorkout.pending, () => {
        console.log("Updating current workout in store...")
      })
      .addCase(editWorkout.fulfilled, (state, action) => {
        state.currentWorkout = action.payload
        state.showEditWorkout = !state.showEditWorkout
        console.log("Update complete")
      })
      .addCase(editProgram.pending, () => {
        console.log("Updating current program in store...")
      })
      .addCase(editProgram.fulfilled, (state, action) => {
        state.currentProgram = action.payload
        state.showEditProgram = !state.showEditProgram
        console.log("Update complete")
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

export const editExercise = createAsyncThunk('editExercise', async (exercise) => {
  return exercise
})

export const editWorkout = createAsyncThunk('editWorkout', async (workout) => {
  return workout
})

export const editProgram = createAsyncThunk('editProgram', async (program) => {
  return program
})

export const { displayExerciseForm, displayWorkoutForm, displayProgramForm } = databaseSlice.actions

export default databaseSlice.reducer