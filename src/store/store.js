import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { modalErrorSlice } from './modalError'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        modalError: modalErrorSlice.reducer

    }
})