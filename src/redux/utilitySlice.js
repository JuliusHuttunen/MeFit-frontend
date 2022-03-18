import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../components/API/Connection";

export const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        loggedIn: false,
        user: {},
        profile: {},
        status: ""
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        logout: (state) => {
            state.loggedIn = false
            state.user = {}
            state.profile = {}
        },
        swapLoggedIn: (state) => {
            state.loggedIn = true
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchProfile.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchProfile.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.profile = action.payload
          })
    }
})

export const { login, setProfile, logout, swapLoggedIn } = utilitySlice.actions

export const fetchProfile = createAsyncThunk('fetchProfile', async () => {
    const[error, profile] = await getUserProfile()
    console.log("ERR", error)
    return profile
})

export default utilitySlice.reducer