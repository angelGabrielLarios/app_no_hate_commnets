import { createSlice } from "@reduxjs/toolkit"
import { USER_APP_ANTIHATE } from "../../helpers"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem(USER_APP_ANTIHATE)) || null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            localStorage.setItem(
                USER_APP_ANTIHATE,
                JSON.stringify(state.user)
            )
        },

        logout: (state) => {
            state.user = null
            localStorage.removeItem(USER_APP_ANTIHATE)

        },
        test: (state, action) => {
            console.log(state, 'state')
            console.log(action)

        }
    }
})

export const { login, logout, test } = authSlice.actions
