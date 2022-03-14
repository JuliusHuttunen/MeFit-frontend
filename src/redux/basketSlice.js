import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
    },
    reducers: {
        add: (state, action) => {
            state.items.push(action.payload)
        },
        del: (state, action) => {
            state.items.splice(action.payload, 1)
        },
    }
})

export const { del, add } = basketSlice.actions

export default basketSlice.reducer