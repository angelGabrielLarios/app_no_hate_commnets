import { createSlice } from "@reduxjs/toolkit"


export const modalErrorSlice = createSlice({
    name: 'modalError',
    initialState: {
        message: ""
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }

    }
})

export const { setMessage } = modalErrorSlice.actions



