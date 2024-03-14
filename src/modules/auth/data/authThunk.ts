/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@src/modules/shared/utils/supabase'
import { message } from 'antd'
import { clearTokens } from '../utils/token'

export const login = createAsyncThunk('auth/login', async (_, { rejectWithValue }) => {
  try {
    const response = await supabase.auth.getUser()
    if (!response.error) {
      return response.data
    }

    throw new Error(response?.error?.message)
  } catch (err: any) {
    return rejectWithValue(err)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await supabase.auth.signOut()
    if (!response.error) {
      message.success('Sign out successfuly')
      clearTokens()
    }
    return response
  } catch (err: any) {
    return rejectWithValue(err)
  }
})
