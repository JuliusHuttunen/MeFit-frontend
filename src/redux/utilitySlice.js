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
        }
    }
})

export const { login, setProfile } = utilitySlice.actions

export default utilitySlice.reducer