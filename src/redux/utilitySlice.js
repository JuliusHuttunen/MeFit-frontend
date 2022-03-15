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
        createTestProfile: (state) => {
            state.profile = {
                "profileId": 1,
                "weight": 91.3,
                "height": 1.83,
                "medicalConditions": "None",
                "disabilities": "None",
                "user": {
                  "userId": 1,
                  "password": "admin",
                  "firstName": "Pete",
                  "lastName": "Hyrrä",
                  "admin": true,
                  "contributor": true
                },
                "address": {
                  "addressId": 1,
                  "addressLine1": "Keskuskatu 1",
                  "addressLine2": null,
                  "addressLine3": null,
                  "postalCode": "00100",
                  "city": "Helsinki",
                  "country": "Finland"
                },
                "goals": [
                  "/api/v1/goals/1"
                ],
                "workouts": [
                  "/api/v1/workouts/6"
                ],
                "programs": [
                  "/api/v1/programs/1"
                ]
            }
        }
    }
})

export const { login, createTestProfile } = utilitySlice.actions

export default utilitySlice.reducer