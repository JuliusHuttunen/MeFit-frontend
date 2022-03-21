import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserProfile } from "../components/API/Connection"

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileId: "",
        weight: "",
        height: "",
        fitnessLevel: null,
        medicalConditions: "",
        disabilities: "",
        address: null,
        goals: [],
        workouts: [],
    },
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(fetchProfile.pending, () => {
            console.log("Getting profile")
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            console.log("Profile fetched")
            state.profileId = action.payload.profileId
            state.weight = action.payload.weight
            state.height = action.payload.height
            state.fitnessLevel = action.payload.fitnessLevel
            state.medicalConditions = action.payload.medicalConditions
            state.disabilities = action.payload.disabilities
            state.address = action.payload.address
            state.goals = action.payload.goals
            state.workouts = action.payload.workouts
        })
    }
})

export const fetchProfile = createAsyncThunk('fetchProfile', async () => {
    const[error, profile] = await getUserProfile()
    if(profile === 404){
        return null
    }
    console.log("ERR", error)
    return profile
})

export default profileSlice.reducer