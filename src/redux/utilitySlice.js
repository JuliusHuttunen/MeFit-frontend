import { createSlice } from "@reduxjs/toolkit";

export const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        loggedIn: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
    }
})

export const { login } = utilitySlice.actions

export default utilitySlice.reducer