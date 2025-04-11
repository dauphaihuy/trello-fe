import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../utils/constants'
import authorizeAxiosInstance from '../../utils/authorizeAxios'
import { toast } from 'react-toastify'

const initialState = {
    currentUser: null
}
export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
        return response.data
    }
)
export const logoutUserAPI = createAsyncThunk(
    'user/logout',
    async (showSuccessMessage = true) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)

        if (showSuccessMessage) {
            toast.success('Logged out successfully!')
        }

        return response.data
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(logoutUserAPI.fulfilled, (state, action) => {
            state.currentUser = null
        })
    }
})

//selector
export const selectCurrentUser = (state) => {
    return state.user.currentUser
}
export const userReducer = userSlice.reducer