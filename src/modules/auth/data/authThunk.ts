/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

type LoginPayload = {
  email: string
  password: string
}

export const login = createAsyncThunk('auth/login', async (query: LoginPayload) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, query)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axiosInstance.get(`/auth/logout`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message)
  }
})
