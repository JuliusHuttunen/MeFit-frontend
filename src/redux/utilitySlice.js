import { createSlice } from "@reduxjs/toolkit";

export const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        loggedIn: false,
        user: {},
        profile: {}
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
    }
})

export const { login, setProfile, logout } = utilitySlice.actions

export default utilitySlice.reducer