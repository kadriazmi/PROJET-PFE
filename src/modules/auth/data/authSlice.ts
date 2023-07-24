/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setTokens } from '../utils/token'
import { login } from './authThunk'

export interface AuthState {
  status: string
  isAuthenticated: boolean
  isInitialised: boolean
  user: {
    id: string
    name: string
    email: string
  } | null
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user } = action.payload
      state.isAuthenticated = isAuthenticated
      state.isInitialised = true
      state.user = user
    },
    restore: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      const { access_token, refresh_token, user } = action.payload.data
      setTokens(access_token, refresh_token)
      state.isAuthenticated = true
      state.user = user
      state.status = 'succeeded'
    })
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload
      state.status = 'failed'
    })
  },
})

export const { initialise, restore } = authSlice.actions

export default authSlice.reducer
